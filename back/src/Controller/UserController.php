<?php

namespace App\Controller;

use App\Entity\Avatar;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\ColorService;
use App\Service\JwtDecodeService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    private $em;
    private $passwordEncoder;
    private $JWTManager;
    private $jwtDecodeService;
    private $validator;
    private $serializer;
    private $colorService;

    public function __construct(EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder, JWTTokenManagerInterface $JWTManager, JwtDecodeService $jwtDecodeService, ValidatorInterface $validator, SerializerInterface $serializer, ColorService $colorService)
    {
        $this->em = $em;
        $this->passwordEncoder = $passwordEncoder;
        $this->JWTManager = $JWTManager;
        $this->jwtDecodeService = $jwtDecodeService;
        $this->validator = $validator;
        $this->serializer = $serializer;
        $this->colorService = $colorService;
    }


    /**
     * @Route("/api/v1/setavatar", name="setavatar_user", METHODS={"POST"})
     */
    public function setAvatar(Request $request, UserRepository $userRepository)
    {
        $data = $request->getContent();

        $jsonData = json_decode($data);

        $tokenService = $this->jwtDecodeService->tokenDecode($jsonData->token);

        $user = $userRepository->findByEmail($tokenService['username']);

        $avatar = $this->serializer->deserialize($data, Avatar::class, 'json');

        if ($jsonData->mood == "") {
            $avatar->setMood('blissful');
        }
        if ($jsonData->color == "") {
            $avatar->setColor('#dfe5f0');
        }


        $user->addAvatar($avatar);
        $this->em->flush();


        return new JsonResponse([
            'setAvatar' => true,
            'avatar' => [
                'type' => $avatar->getType(),
                'mood' => $avatar->getMood(),
                'color' => $avatar->getColor()
            ]
        ], Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/v1/register", name="register_user", METHODS={"POST"})
     */
    public function register(Request $request, UserRepository $userRepository)
    {
        // I get the data from the request
        $data = $request->getContent();
        $jsonData = json_decode($data);
        $user = $this->serializer->deserialize($data, User::class, 'json');

        //I check if the email exists in the database
        $emailInDb = $userRepository->findByEmail($user->getEmail());
        // If not, I process the form
        if ($emailInDb === null) {
            if ($jsonData->confirm_password === $jsonData->password) {
                // Initialization of the entity

                $user->setCreatedAt(new DateTime());
                $user->setRoles(['ROLE_USER']);
                $user->setCountActivities(0);

                // Hash password
                $user->setPassword($this->passwordEncoder->encodePassword($user, $jsonData->password));

                //$avatar = $request->files->get('avatar');

                $errors = $this->validator->validate($user);

                if (count($errors) > 0) {
                    return $this->json($errors, Response::HTTP_ACCEPTED);
                }


                $avatar = new Avatar();
                $avatar->setType($jsonData->type);
                $avatar->setMood($jsonData->mood);
                $avatar->setColor($jsonData->color);
                $user->addAvatar($avatar);


                $token = $this->JWTManager->create($user);
                // I save in user database

                $this->em->persist($user);
                //$user->addAvatar($avatar);
                $this->em->flush();

                // I send the answer in json
                return new JsonResponse([
                    'registered' => true,
                    'user' => [
                        'id' => $user->getId(),
                        'email' => $user->getEmail(),
                        'firstname' => $user->getFirstname(),
                        'lastname' => $user->getLastname(),
                        'role' => $user->getRoles(),
                        'birthday' => $user->getBirthday()->format('Y-m-d'),
                        'city' => $user->getCity(),
                        'avatar' => [
                            "type" => $avatar->getType(),
                            "mood" => $avatar->getMood(),
                            "color" => $avatar->getColor(),
                        ],
                        'token' => $token
                    ]
                ], Response::HTTP_CREATED);
            } else {
                // If the two passwords do not match, I send a 403 error
                return new JsonResponse(
                    [
                        'registred' => false,
                        'violations' => [
                            '0' => [
                                'propertyPath' => 'password',
                                'title' => 'Les deux mots de passe ne correspondent pas, vérifie s\'il te plait :('
                            ]
                        ]
                    ],
                    Response::HTTP_ACCEPTED
                );
            }
        } else {
            // If an email is already exist in the database, I send a 403 error
            return new JsonResponse(
                [
                    'registred' => false,
                    'violations' => [
                        '0' => [
                            'propertyPath' => 'email',
                            'title' => 'L\'email existe déjà !'
                        ]
                    ]
                ],
                Response::HTTP_ACCEPTED
            );
        }
    }

    /**
     * @Route("/api/v1/login", name="login_user", METHODS={"POST"})
     */
    public function login(Request $request, UserRepository $userRepository)
    {
        // I get the data from the request
        $jsonData = json_decode($request->getContent(), true);

        // Find user by email. If user exists we store the user in the $user variable.
        $user = $userRepository->findByEmail($jsonData['email']);

        // If the user exists, we check the password and return a new JSON object with the credentials
        // If the user does not exist, a new JSON error message is returned to the user
        if ($user !== null) {
            if ($this->passwordEncoder->isPasswordValid($user, $jsonData['password'])) {

                // Generate the token
                $token = $this->JWTManager->create($user);

                $avatars = $user->getAvatars()->getValues();
                $avatar = end($avatars);
                $hexa = $this->colorService->retreiveColor($user);

                if ($user->getCountActivities() >= 5) {
                    $this->em->flush();
                    // Return all the datas with the token in a JSON response
                    return new JsonResponse([
                        'logged' => true,
                        'satisfaction' => true,
                        'color' => $hexa,
                        'user' => [
                            'id' => $user->getId(),
                            'email' => $user->getEmail(),
                            'firstname' => $user->getFirstname(),
                            'lastname' => $user->getLastname(),
                            'role' => $user->getRoles(),
                            'birthday' => $user->getBirthday()->format('Y-m-d'),
                            'city' => $user->getCity(),
                            'avatar' => [
                                "type" => $avatar->getType(),
                                "mood" => $avatar->getMood(),
                                "color" => $avatar->getColor(),
                            ],
                            'token' => $token
                        ]
                    ], Response::HTTP_OK);
                } else {
                    return new JsonResponse([
                        'logged' => true,
                        'satisfaction' => false,
                        'color' => $hexa,
                        'user' => [
                            'id' => $user->getId(),
                            'email' => $user->getEmail(),
                            'firstname' => $user->getFirstname(),
                            'lastname' => $user->getLastname(),
                            'role' => $user->getRoles(),
                            'birthday' => $user->getBirthday()->format('Y-m-d'),
                            'city' => $user->getCity(),
                            'avatar' => [
                                "type" => $avatar->getType(),
                                "mood" => $avatar->getMood(),
                                "color" => $avatar->getColor(),
                            ],
                            'token' => $token
                        ]
                    ], Response::HTTP_OK);
                }
            } else {
                // If the passwords do not match, we return a JSON error
                return new JsonResponse(
                    [
                        'logged' => false,
                        'violations' => [
                            '0' => [
                                'propertyPath' => 'password',
                                'title' => 'Il me semble que ton email ET/OU ton mot de passe sont incorrect ... Tu peux les vérifier ?'
                            ]
                        ]
                    ],
                    Response::HTTP_ACCEPTED
                );
            }
        } else {
            // The email does not exist, we return a JSON error
            return new JsonResponse(
                [
                    'logged' => false,
                    'violations' => [
                        '0' => [
                            'propertyPath' => 'email',
                            'title' => 'Il me semble que ton email ET/OU ton mot de passe sont incorrect ... Tu peux les vérifier ?'
                        ]
                    ]
                ],
                Response::HTTP_ACCEPTED
            );
        }
    }

    /**
     * @Route("/api/v1/edituser", name="edit_user", METHODS={"POST"})
     */
    public function edit(Request $request, UserRepository $userRepository)
    {
        // Get the content of the Request and convert the json data to PHP data object 
        $data = $request->getContent();
        $jsonData = json_decode($data);

        // Use the serializer to populate the User Object with the data of the request
        $userFront = $this->serializer->deserialize($data, User::class, 'json');

        // Use the service jwtDecodeService to decode the token in the request content
        $tokenService = $this->jwtDecodeService->tokenDecode($jsonData->token);

        // Use the userRespository to find the email of the user with the username stored in the tokenService
        $user = $userRepository->findByEmail($tokenService['username']);





        // Use the passwordEncoder to check the validity of the password entered in the Request and the password in DB
        if ($this->passwordEncoder->isPasswordValid($user, $jsonData->password)) {

            // If the firstname is not empty in the request we set the value with the data of the serializer
            if (!empty($jsonData->firstname)) {
                $user->setFirstname($userFront->getFirstname());
            }
            if (!empty($jsonData->lastname)) {
                $user->setLastname($userFront->getLastname());
            }
            if (!empty($jsonData->city)) {
                $user->setCity($userFront->getCity());
            }
            if (!empty($jsonData->email)) {
                $user->setEmail($userFront->getEmail());
            }

            $avatars = $user->getAvatars()->getValues();
            $avatar = end($avatars);

            $user->setUpdatedAt(new DateTime());

            // Use the validator to check the errors of the $user 
            $errors = $this->validator->validate($user);

            // If errors > 0 we return the detail of the error(s)
            if (count($errors) > 0) {
                return $this->json($errors, Response::HTTP_ACCEPTED);
            }
            // Save the user in database
            $this->em->flush();

            // Generate the token
            $token = $this->JWTManager->create($user);

            // Return the complete object with all data
            return new JsonResponse([
                'updated' => true,
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'firstname' => $user->getFirstname(),
                    'lastname' => $user->getLastname(),
                    'role' => $user->getRoles(),
                    'birthday' => $user->getBirthday()->format('Y-m-d'),
                    'city' => $user->getCity(),
                    'avatar' => [
                        "type" => $avatar->getType(),
                        "mood" => $avatar->getMood(),
                        "color" => $avatar->getColor(),
                    ],
                    'token' => $token
                ]
            ], Response::HTTP_OK);
        } else {
            // If the form was not good, I send a 403 error
            return new JsonResponse(
                [
                    'updated' => false,
                    'violations' => [
                        '0' => [
                            'propertyPath' => 'password',
                            'title' => 'Tu t\'es trompé dans ton mot de passe, retape-le :D'
                        ]
                    ]
                ],
                Response::HTTP_ACCEPTED
            );
        }
    }
}
