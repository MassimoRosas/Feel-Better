<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\ColorRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;


class ColorService
{

    private $colorRepository;

    public function __construct(ColorRepository $colorRepository)
    {
        $this->colorRepository = $colorRepository;
    }

    public function retreiveColor(User $user)
    {

        // Use the userRespository to find the email of the user with the username stored in the tokenService

        $AllMoodDateForUser = $user->getUserMoodDates()->getValues();
        $lastMoodDate = end($AllMoodDateForUser);

        if (!$lastMoodDate) {
            $hexa = '#8590bd';
        } else {
            $allMoodForUser = $lastMoodDate->getMoods()->getValues();
            $lastMood = end($allMoodForUser);
            $colorEntity = $this->colorRepository->findByMood($lastMood);
            $colorData = end($colorEntity);

            $hexa = $colorData->getHexadecimal();
        }



        return $hexa;
    }
}
