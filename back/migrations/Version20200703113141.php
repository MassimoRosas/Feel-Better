<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200703113141 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE idea (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(70) NOT NULL, picture VARCHAR(255) DEFAULT NULL, estimation INT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE idea_category (idea_id INT NOT NULL, category_id INT NOT NULL, INDEX IDX_7C65DC785B6FEF7D (idea_id), INDEX IDX_7C65DC7812469DE2 (category_id), PRIMARY KEY(idea_id, category_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mood (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mood_idea (mood_id INT NOT NULL, idea_id INT NOT NULL, INDEX IDX_3DF9FC49B889D33E (mood_id), INDEX IDX_3DF9FC495B6FEF7D (idea_id), PRIMARY KEY(mood_id, idea_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, lastname VARCHAR(75) NOT NULL, firstname VARCHAR(75) NOT NULL, birthday DATE NOT NULL, city VARCHAR(100) NOT NULL, avatar VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_mood_date (id INT AUTO_INCREMENT NOT NULL, mood_date DATE NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_mood_date_user (user_mood_date_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_110AD692656325F (user_mood_date_id), INDEX IDX_110AD692A76ED395 (user_id), PRIMARY KEY(user_mood_date_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_mood_date_mood (user_mood_date_id INT NOT NULL, mood_id INT NOT NULL, INDEX IDX_9FA0AE2D656325F (user_mood_date_id), INDEX IDX_9FA0AE2DB889D33E (mood_id), PRIMARY KEY(user_mood_date_id, mood_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE idea_category ADD CONSTRAINT FK_7C65DC785B6FEF7D FOREIGN KEY (idea_id) REFERENCES idea (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE idea_category ADD CONSTRAINT FK_7C65DC7812469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE mood_idea ADD CONSTRAINT FK_3DF9FC49B889D33E FOREIGN KEY (mood_id) REFERENCES mood (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE mood_idea ADD CONSTRAINT FK_3DF9FC495B6FEF7D FOREIGN KEY (idea_id) REFERENCES idea (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_mood_date_user ADD CONSTRAINT FK_110AD692656325F FOREIGN KEY (user_mood_date_id) REFERENCES user_mood_date (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_mood_date_user ADD CONSTRAINT FK_110AD692A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_mood_date_mood ADD CONSTRAINT FK_9FA0AE2D656325F FOREIGN KEY (user_mood_date_id) REFERENCES user_mood_date (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_mood_date_mood ADD CONSTRAINT FK_9FA0AE2DB889D33E FOREIGN KEY (mood_id) REFERENCES mood (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE idea_category DROP FOREIGN KEY FK_7C65DC7812469DE2');
        $this->addSql('ALTER TABLE idea_category DROP FOREIGN KEY FK_7C65DC785B6FEF7D');
        $this->addSql('ALTER TABLE mood_idea DROP FOREIGN KEY FK_3DF9FC495B6FEF7D');
        $this->addSql('ALTER TABLE mood_idea DROP FOREIGN KEY FK_3DF9FC49B889D33E');
        $this->addSql('ALTER TABLE user_mood_date_mood DROP FOREIGN KEY FK_9FA0AE2DB889D33E');
        $this->addSql('ALTER TABLE user_mood_date_user DROP FOREIGN KEY FK_110AD692A76ED395');
        $this->addSql('ALTER TABLE user_mood_date_user DROP FOREIGN KEY FK_110AD692656325F');
        $this->addSql('ALTER TABLE user_mood_date_mood DROP FOREIGN KEY FK_9FA0AE2D656325F');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE idea');
        $this->addSql('DROP TABLE idea_category');
        $this->addSql('DROP TABLE mood');
        $this->addSql('DROP TABLE mood_idea');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_mood_date');
        $this->addSql('DROP TABLE user_mood_date_user');
        $this->addSql('DROP TABLE user_mood_date_mood');
    }
}
