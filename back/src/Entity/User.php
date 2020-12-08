<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotBlank(
     * message = "Tu n'aurais pas oublié de remplir ton e-mail ?"
     * )
     * @Assert\Email(
     * mode = "strict",
     * message = "Il me semble que ce n'est pas une adresse e-mail valide :("
     * )
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(
     * message = "hep hep hep, un p'tit mot de passe s'il te plait !"
     * )
     * @Assert\Length(
     *      min = 8,
     *      minMessage = "Ton passe est un peu court ? il me faut au moins 8 caractères",
     * )
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=75)
     * @Assert\NotBlank(
     * message = "Tu n'a pas de nom de famille ?"
     * )
     * @Assert\Length(
     *      min = 2,
     *      max = 75,
     *      minMessage = "Il n'est pas un peu court ?",
     *      maxMessage = "Un poil trop long ? :o",
     * )
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=75)
     * @Assert\NotBlank(
     * message = "Tu t'appel comment ?"
     * )
     * @Assert\Length(
     *      min = 2,
     *      max = 75,
     *      minMessage = "C'est un peu court ...",
     *      maxMessage = "Ca ce prononce comment ? c'est un peu long pour moi ...",
     * )
     */
    private $firstname;

    /**
     * @ORM\Column(type="date")
     * @Assert\NotBlank(
     * message = "Hé ! Ta quel âge ?"
     * )
     */
    private $birthday;

    /**
     * @ORM\Column(type="string", length=100)
     * @Assert\NotBlank(
     * message = "T'habite ou ? pour te trouver des activités c'ets essentiel !"
     * )
     * @Assert\Length(
     *      min = 2,
     *      max = 100,
     *      minMessage = "Un peu court ton nom de ville",
     *      maxMessage = "C'est un peu long pour moi ...",
     * )
     */
    private $city;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created_at;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updated_at;

    /**
     * @ORM\ManyToMany(targetEntity=UserMoodDate::class, mappedBy="users")
     */
    private $userMoodDates;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private $count_activities;

    /**
     * @ORM\OneToMany(targetEntity=Satisfaction::class, mappedBy="user", orphanRemoval=true)
     */
    private $satisfactions;

    /**
     * @ORM\OneToMany(targetEntity=Avatar::class, mappedBy="user", cascade={"persist"})
     */
    private $avatars;



    public function __construct()
    {
        $this->userMoodDates = new ArrayCollection();
        $this->satisfactions = new ArrayCollection();
        $this->avatars = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->getEmail();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getBirthday(): ?\DateTimeInterface
    {
        return $this->birthday;
    }

    public function setBirthday(\DateTimeInterface $birthday): self
    {
        $this->birthday = $birthday;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

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
            $userMoodDate->addUser($this);
        }

        return $this;
    }

    public function removeUserMoodDate(UserMoodDate $userMoodDate): self
    {
        if ($this->userMoodDates->contains($userMoodDate)) {
            $this->userMoodDates->removeElement($userMoodDate);
            $userMoodDate->removeUser($this);
        }

        return $this;
    }

    public function getCountActivities(): ?int
    {
        return $this->count_activities;
    }

    public function setCountActivities(int $count_activities): self
    {
        $this->count_activities = $count_activities;

        return $this;
    }

    /**
     * @return Collection|Satisfaction[]
     */
    public function getSatisfactions(): Collection
    {
        return $this->satisfactions;
    }

    public function addSatisfaction(Satisfaction $satisfaction): self
    {
        if (!$this->satisfactions->contains($satisfaction)) {
            $this->satisfactions[] = $satisfaction;
            $satisfaction->setUser($this);
        }

        return $this;
    }

    public function removeSatisfaction(Satisfaction $satisfaction): self
    {
        if ($this->satisfactions->contains($satisfaction)) {
            $this->satisfactions->removeElement($satisfaction);
            // set the owning side to null (unless already changed)
            if ($satisfaction->getUser() === $this) {
                $satisfaction->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Avatar[]
     */
    public function getAvatars(): Collection
    {
        return $this->avatars;
    }

    public function addAvatar(Avatar $avatar): self
    {
        if (!$this->avatars->contains($avatar)) {
            $this->avatars[] = $avatar;
            $avatar->setUser($this);
        }

        return $this;
    }

    public function removeAvatar(Avatar $avatar): self
    {
        if ($this->avatars->contains($avatar)) {
            $this->avatars->removeElement($avatar);
            // set the owning side to null (unless already changed)
            if ($avatar->getUser() === $this) {
                $avatar->setUser(null);
            }
        }

        return $this;
    }
}
