<?php

namespace App\Tests\Controller;

use App\Repository\UserRepository;
use App\Service\JwtDecodeService;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use PHPUnit\Framework\TestCase;

use Symfony\Component\BrowserKit\Request;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ProfileControllerTest extends WebTestCase
{

    public function testLoggedIn()
    {
        $client = static::createClient();
        $userRepository = static::$container->get(UserRepository::class);
        $testUser = $userRepository->findOneByEmail('quentin.barraud2@gmail.com');

        $client->loginUser($testUser);

        // test e.g. the profile page
        //$this->assertTrue(true);
        $client->request('GET', '/login');
        $this->assertResponseIsSuccessful();
    }
}
