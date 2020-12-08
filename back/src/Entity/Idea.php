<?php

namespace App\Entity;

use App\Repository\IdeaRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=IdeaRepository::class)
 */
class Idea
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=70)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $picture;

    /**
     * @ORM\Column(type="integer")
     */
    private $estimation;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created_at;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updated_at;

    /**
     * @ORM\ManyToMany(targetEntity=Mood::class, inversedBy="ideas")
     */
    private $moods;

    /**
     * @ORM\ManyToMany(targetEntity=Category::class, inversedBy="ideas")
     */
    private $categories;

    /**
     * @ORM\ManyToMany(targetEntity=UserMoodDate::class, mappedBy="ideas")
     */
    private $userMoodDates;

    public function __construct()
    {
        $this->moods = new ArrayCollection();
        $this->categories = new ArrayCollection();
        $this->userMoodDates = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->getName();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getEstimation(): ?int
    {
        return $this->estimation;
    }

    public function setEstimation(int $estimation): self
    {
        $this->estimation = $estimation;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeInterface $updated_at): self
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    /**
     * @return Collection|Mood[]
     */
    public function getMoods(): Collection
    {
        return $this->moods;
    }

    public function addMood(Mood $mood): self
    {
        if (!$this->moods->contains($mood)) {
            $this->moods[] = $mood;
            $mood->addIdea($this);
        }

        return $this;
    }

    public function removeMood(Mood $mood): self
    {
        if ($this->moods->contains($mood)) {
            $this->moods->removeElement($mood);
            $mood->removeIdea($this);
        }

        return $this;
    }

    /**
     * @return Collection|Category[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories[] = $category;
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        if ($this->categories->contains($category)) {
            $this->categories->removeElement($category);
        }

        return $this;
    }

    /**
     * @return Collection|UserMoodDate[]
     */
    public function getUserMoodDates(): Collection
    {
        return $this->userMoodDates;
    }

    public function addUserMoodDate(UserMoodDate $userMoodDate): self
    {
        if (!$this->userMoodDates->contains($userMoodDate)) {
            $this->userMoodDates[] = $userMoodDate;
            $userMoodDate->addIdea($this);
        }

        return $this;
    }

    public function removeUserMoodDate(UserMoodDate $userMoodDate): self
    {
        if ($this->userMoodDates->contains($userMoodDate)) {
            $this->userMoodDates->removeElement($userMoodDate);
            $userMoodDate->removeIdea($this);
        }

        return $this;
    }
}
