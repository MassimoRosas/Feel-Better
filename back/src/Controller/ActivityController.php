<?php

namespace App\Controller;

use App\Entity\UserMoodDate;
use App\Repository\ColorRepository;
use App\Repository\IdeaRepository;
use App\Repository\MoodRepository;
use App\Repository\UserRepository;
use App\Service\JwtDecodeService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;

class ActivityController extends AbstractController
{

    private $jwtDecodeService;
    private $userRepository;
    private $ideaRepository;
    private $moodRepository;
    private $colorRepository;
    private $em;
    private $session;

    public function __construct(JwtDecodeService $jwtDecodeService, UserRepository $userRepository, IdeaRepository $ideaRepository, MoodRepository $moodRepository, ColorRepository $colorRepository, EntityManagerInterface $em, SessionInterface $session)
    {
        $this->jwtDecodeService = $jwtDecodeService;
        $this->userRepository = $userRepository;
        $this->ideaRepository = $ideaRepository;
        $this->moodRepository = $moodRepository;
        $this->colorRepository = $colorRepository;
        $this->em = $em;
        $this->session = $session;
    }

    /**
     * @Route("/api/v1/suggestion", name="suggestion_activity")
     */
    public function suggestion(Request $request)
    {
        $this->session->set('suggestion', []);
        // Retrieve the content of the $request and convert the json data to PHP data object
        $jsonData = json_decode($request->getContent());
        // Use the service jwtDecodeService to decode the token in the request content
        $tokenService = $this->jwtDecodeService->tokenDecode($jsonData->token);
        // Use the userRespository to find the email of the user with the username stored in the tokenService
        $user = $this->userRepository->findByEmail($tokenService['username']);

        // Retrieve the user mood dates
        $userMoodDateAll = $user->getUserMoodDates()->getValues();

        // If the count of the userMoodDateAll is inferior or equal to 0, return errorMoodDate true
        if (count($userMoodDateAll) <= 0) {
            return $this->json(['errorMoodDate' => true], Response::HTTP_ACCEPTED);
        }
        // Retrieve the last MoodDate
        $userMoodDate = $userMoodDateAll[count($userMoodDateAll) - 1];

        // Retrieve the budget
        $userBudget = $userMoodDate->getBudget();
        // Retrieve the Moods
        $mood = $userMoodDate->getMoods()->getValues();

        // Retrieve All the ideas with the mood id and the budget of the user
        $ideasAll = $this->ideaRepository->findAllByMood($mood[count($mood) - 1]->getId(), $userBudget);
        // Fix the number of activities to 6
        $nbActivitiesForResult = 6;

        // We determine the number of activities for the result
        for ($i = 0; $i <= count($ideasAll) && $i <= 6; $i++) {
            $nbActivitiesForResult = $i;
        }

        // Create an ARRAY with random ideas of the number of activities
        $randomIdea = array_rand($ideasAll, $nbActivitiesForResult);
        $tableIdea = [];

        // Build a array of JSON object(s) with the detail of each Idea 
        foreach ($randomIdea as $keyIdea => $idea) {
            $tableIdea[$keyIdea] = [
                "name" => $ideasAll[$idea]->getName(),
                "picture" => $ideasAll[$idea]->getPicture(),
                "estimation" => $ideasAll[$idea]->getEstimation(),
                "category" => []

            ];
            foreach ($ideasAll[$idea]->getCategories()->getValues() as $keyCategory => $category) {

                $tableCategories = $category->getNameFr();
                array_push($tableIdea[$keyIdea]['category'], $tableCategories);
            }
        }

        //$this->session->set('suggestion', $tableIdea);

        return new JsonResponse(['suggestion' => true, 'ideas' => $tableIdea], Response::HTTP_OK);
    }


    /**
     * @Route("/api/v1/setmood", name="set_mood")
     */
    public function setMood(Request $request)
    {
        // Retrieve the content of the $request and convert the json data to PHP data object
        $jsonData = json_decode($request->getContent());

        // Use the service jwtDecodeService to decode the token in the request content
        $tokenService = $this->jwtDecodeService->tokenDecode($jsonData->token);

        // Use the userRespository to find the email of the user with the username stored in the tokenService
        $userEntity = $this->userRepository->findByEmail($tokenService['username']);
        // Retrieve mood by nameEn in the content of the Request ($jsonData)
        $moodEntity = $this->moodRepository->findByNameEn($jsonData->mood);

        $colorEntity = $this->colorRepository->findByMood($moodEntity);
        $colorData = end($colorEntity);
        $date = new DateTime();
        // Create a new UserMoodDate object and add user, mood, budget and mood date
        $userMoodDate = new UserMoodDate;
        $userMoodDate->addUser($userEntity);
        $userMoodDate->addMood($moodEntity);
        $userMoodDate->setBudget($jsonData->estimation);
        $userMoodDate->setMoodDate($date);

        // Persist the userMoodDate in db
        $this->em->persist($userMoodDate);
        $this->em->flush();

        return new JsonResponse(['setMood' => true, 'color' => $colorData->getHexadecimal()], Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/v1/setidea", name="set_idea")
     */
    public function setIdea(Request $request)
    {
        // Retrieve the content of the $request and convert the json data to PHP data object
        $jsonData = json_decode($request->getContent());

        // Use the service jwtDecodeService to decode the token in the request content
        $tokenService = $this->jwtDecodeService->tokenDecode($jsonData->token);

        // Use the userRespository to find the email of the user with the username stored in the tokenService
        $userEntity = $this->userRepository->findByEmail($tokenService['username']);
        $countActivites = $userEntity->getCountActivities();

        $ideaEntity = $this->ideaRepository->findByName($jsonData->idea);

        $userMoodDateAllForUser = $userEntity->getUserMoodDates()->getValues();

        $lastuserMoodDateForUser = $userMoodDateAllForUser[count($userMoodDateAllForUser) - 1];
        $lastuserMoodDateForUser->addIdea(end($ideaEntity));

        $newCountActivities = $countActivites + 1;
        $userEntity->setCountActivities($newCountActivities);

        $this->em->flush();

        $resultCalendar = [];
        $moodDateTable = [];
        foreach ($userMoodDateAllForUser as $key => $moodDate) {

            $moodDateTable[$key]['mood'] = [];

            $moodDataTable = $moodDate->getMoods()->getValues();
            $moodData = end($moodDataTable);
            $ideaDataTable = $moodDate->getIdeas()->getValues();
            $ideaData = end($ideaDataTable);

            if (!$ideaData) {
                $idea = null;
            } else {
                $idea = $ideaData->getName();
            }

            $moodDateTable[$key]['date'] = $moodDate->getMoodDate()->format('Y-m-d');

            $moodDateTable[$key]['mood']['moodName'] = $moodData->getNameEn();
            $moodDateTable[$key]['mood']['idea'] = $idea;
            $moodDateTable[$key]['mood']['id'] = uniqid();


            array_push($resultCalendar, $moodDateTable[$key]);
        }
        return new JsonResponse(['setIdea' => true, 'moodDatas' => $resultCalendar], Response::HTTP_OK);
    }

    /**
     * @Route("/api/v1/moodcalendar", name="mood_calendar")
     */
    public function moodCalendar(Request $request)
    {
        // Retrieve the content of the $request and convert the json data to PHP data object
        $jsonData = json_decode($request->getContent());

        // Use the service jwtDecodeService to decode the token in the request content
        $tokenService = $this->jwtDecodeService->tokenDecode($jsonData->token);

        // Use the userRespository to find the email of the user with the username stored in the tokenService
        $userEntity = $this->userRepository->findByEmail($tokenService['username']);

        $userMoodDates = $userEntity->getUserMoodDates()->getValues();

        $resultCalendar = [];
        $moodDateTable = [];
        foreach ($userMoodDates as $key => $moodDate) {

            $moodDateTable[$key]['mood'] = [];

            $moodDataTable = $moodDate->getMoods()->getValues();
            $moodData = end($moodDataTable);
            $ideaDataTable = $moodDate->getIdeas()->getValues();
            $ideaData = end($ideaDataTable);

            if (!$ideaData) {
                $idea = null;
            } else {
                $idea = $ideaData->getName();
            }

            $moodDateTable[$key]['date'] = $moodDate->getMoodDate()->format('Y-m-d');

            $moodDateTable[$key]['mood']['moodName'] = $moodData->getNameEn();
            $moodDateTable[$key]['mood']['idea'] = $idea;
            $moodDateTable[$key]['mood']['id'] = uniqid();


            array_push($resultCalendar, $moodDateTable[$key]);
        }




        return new JsonResponse(['moodCalendar' => true, 'moodDatas' => $resultCalendar], Response::HTTP_OK);
    }
}
