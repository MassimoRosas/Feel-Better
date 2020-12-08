<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200717113528 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE satisfaction (id INT AUTO_INCREMENT NOT NULL, rating INT NOT NULL, comment VARCHAR(255) DEFAULT NULL, pertinence INT DEFAULT NULL, postponement_date DATETIME DEFAULT NULL, answer VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user ADD satisfactions_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649221512A2 FOREIGN KEY (satisfactions_id) REFERENCES satisfaction (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649221512A2 ON user (satisfactions_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649221512A2');
        $this->addSql('DROP TABLE satisfaction');
        $this->addSql('DROP INDEX IDX_8D93D649221512A2 ON user');
        $this->addSql('ALTER TABLE user DROP satisfactions_id');
    }
}
