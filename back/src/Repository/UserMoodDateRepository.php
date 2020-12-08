<?php

namespace App\Repository;

use App\Entity\UserMoodDate;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method UserMoodDate|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserMoodDate|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserMoodDate[]    findAll()
 * @method UserMoodDate[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserMoodDateRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserMoodDate::class);
    }

    // /**
    //  * @return UserMoodDate[] Returns an array of UserMoodDate objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?UserMoodDate
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */


    public function findWithAllDataForSuggestion()
    {
        return $this->createQueryBuilder('u')
            ->leftJoin("user_mood_date.users", "user")
            ->getQuery()
            ->getResult();
    }
}
