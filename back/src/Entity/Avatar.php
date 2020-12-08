<?php

namespace App\Entity;

use App\Repository\AvatarRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AvatarRepository::class)
 */
class Avatar
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $mood;

    /**
     * @ORM\Column(type="string", length=7, options={"default" : "#dfe5f0"})
     */
    private $color;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="avatars", cascade={"persist"})
     */
    private $user;





    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getMood(): ?string
    {
        return $this->mood;
    }

    public function setMood(string $mood): self
    {
        $this->mood = $mood;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): self
    {
        $this->color = $color;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
