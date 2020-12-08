<?php

namespace App\Service;

use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class JwtDecodeService
{

    private $JWTManager;
    private $userRepository;

    public function __construct(JWTEncoderInterface $JWTManager, UserRepository $userRepository)
    {
        $this->JWTManager = $JWTManager;
        $this->userRepository = $userRepository;
    }

    public function tokenVerifyUser($token)
    {
        try {
            $jwt = $this->JWTManager->decode($token);
            $user = $this->userRepository->findByEmail($jwt['username']);
            $avatars = $user->getAvatars()->getValues();
            $avatar = end($avatars);
        } catch (Throwable $e) {
            return new JsonResponse([
                'logged' => false,
                'user' => []
            ], Response::HTTP_I_AM_A_TEAPOT);
        }



        return new JsonResponse([
            'logged' => true,
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
                    "color" => $avatar->getColor()
                ],
                'token' => $token
            ]
        ], Response::HTTP_OK);
    }

    public function tokenDecode($token)
    {

        try {
            $jwt = $this->JWTManager->decode($token);
        } catch (Throwable $e) {
            return new JsonResponse(['logged' => false], Response::HTTP_UNAUTHORIZED);
        }

        return $jwt;
    }
}
