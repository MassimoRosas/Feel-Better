<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200717130527 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE satisfaction DROP FOREIGN KEY FK_8A8E0C1367B3B43D');
        $this->addSql('DROP INDEX IDX_8A8E0C1367B3B43D ON satisfaction');
        $this->addSql('ALTER TABLE satisfaction ADD user_id INT NOT NULL, DROP users_id, DROP postponement_date, DROP updated_at');
        $this->addSql('ALTER TABLE satisfaction ADD CONSTRAINT FK_8A8E0C13A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_8A8E0C13A76ED395 ON satisfaction (user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE satisfaction DROP FOREIGN KEY FK_8A8E0C13A76ED395');
        $this->addSql('DROP INDEX IDX_8A8E0C13A76ED395 ON satisfaction');
        $this->addSql('ALTER TABLE satisfaction ADD users_id INT DEFAULT NULL, ADD postponement_date DATETIME DEFAULT NULL, ADD updated_at DATETIME DEFAULT NULL, DROP user_id');
        $this->addSql('ALTER TABLE satisfaction ADD CONSTRAINT FK_8A8E0C1367B3B43D FOREIGN KEY (users_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_8A8E0C1367B3B43D ON satisfaction (users_id)');
    }
}
