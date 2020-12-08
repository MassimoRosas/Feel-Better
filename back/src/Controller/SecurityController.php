<?php

namespace App\Controller;

use App\Repository\ColorRepository;
use App\Repository\UserRepository;
use App\Service\ColorService;
use App\Service\JwtDecodeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{

    private $jwtDecodeService;
    private $session;
    private $colorService;
    private $userRepository;


    public function __construct(JwtDecodeService $jwtDecodeService, SessionInterface $session, ColorService $colorService, UserRepository $userRepository)
    {
        $this->jwtDecodeService = $jwtDecodeService;
        $this->session = $session;
        $this->colorService = $colorService;
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/api/v1/islogged", name="is_logged")
     */
    public function isLogged(Request $request)
    {
        $jsonData = json_decode($request->getContent());

        $verifyUser = $this->jwtDecodeService->tokenVerifyUser($jsonData->token);

        if ($verifyUser->getStatusCode() != '418') {
            $tokenService = $this->jwtDecodeService->tokenDecode($jsonData->token);
            $user = $this->userRepository->findByEmail($tokenService['username']);
            $hexa = $this->colorService->retreiveColor($user);
        } else {
            $hexa = '#8590bd';
        }

        if (empty($this->session->get('suggestion'))) {
            return new JsonResponse(['suggestionBool' => false, 'color' => $hexa, 'verifyUser' => json_decode($verifyUser->getContent())], $verifyUser->getStatusCode());
        } else {
            return new JsonResponse(['suggestionBool' => true, 'color' => $hexa, 'suggestion' => $this->session->get('suggestion'), 'verifyUser' =>  json_decode($verifyUser->getContent())], $verifyUser->getStatusCode());
        }
    }

    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        //if ($this->getUser()) {
        //    return $this->redirectToRoute('easyadmin');
        //}

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'controller_name' => 'login', 'error' => $error]);
    }

    /**
     * @Route("/logout", name="app_logout", methods={"GET"})
     */
    public function logout()
    {
        // controller can be blank: it will never be executed!
        throw new \Exception('Don\'t forget to activate logout in security.yaml');
    }
}
