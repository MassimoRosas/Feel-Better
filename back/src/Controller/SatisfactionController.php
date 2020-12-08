<?php

namespace App\Controller;

use App\Entity\Satisfaction;
use App\Repository\UserRepository;
use App\Repository\SatisfactionRepository;
use App\Service\JwtDecodeService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class SatisfactionController extends AbstractController
{
    private $em;
    private $jwtDecodeService;
    private $validator;
    private $serializer;

    public function __construct(EntityManagerInterface $em, JwtDecodeService $jwtDecodeService, ValidatorInterface $validator, SerializerInterface $serializer, UserRepository $userRepository)
    {
        $this->em = $em;
        $this->jwtDecodeService = $jwtDecodeService;
        $this->validator = $validator;
        $this->serializer = $serializer;
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/api/v1/setsatisfaction", name="satisfaction_create", METHODS={"POST"})
     */
    public function setsatisfaction(Request $request)
    {
        // I get the data from the request
        $data = $request->getContent();
        $jsonData = json_decode($data);
        $satisfaction = $this->serializer->deserialize($data, Satisfaction::class, 'json');

        // Use the service jwtDecodeService to decode the token in the request content
        $tokenService = $this->jwtDecodeService->tokenDecode($jsonData->token);
        // Use the userRespository to find the email of the user with the username stored in the tokenService
        $user = $this->userRepository->findByEmail($tokenService['username']);

        if ($user) {
            $satisfaction->setCreatedAt(new DateTime());

            $errors = $this->validator->validate($satisfaction);

            if (count($errors) > 0) {
                return $this->json($errors, Response::HTTP_ACCEPTED);
            }

            $user->addSatisfaction($satisfaction);
            // I save satisfaction in database
            $this->em->persist($satisfaction);
            $user->setCountActivities(0);
            $this->em->flush();

            // I send the answer in json
            return new JsonResponse(['setSatisfaction' => true], Response::HTTP_CREATED);
        } else {
            // I send a 403 error
            return new JsonResponse(['setSatisfaction' => false], Response::HTTP_ACCEPTED);
        }
    }
}
