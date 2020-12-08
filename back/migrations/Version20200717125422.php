<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200717125422 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE satisfaction ADD users_id INT DEFAULT NULL, DROP answer');
        $this->addSql('ALTER TABLE satisfaction ADD CONSTRAINT FK_8A8E0C1367B3B43D FOREIGN KEY (users_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_8A8E0C1367B3B43D ON satisfaction (users_id)');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649221512A2');
        $this->addSql('DROP INDEX IDX_8D93D649221512A2 ON user');
        $this->addSql('ALTER TABLE user DROP satisfactions_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE satisfaction DROP FOREIGN KEY FK_8A8E0C1367B3B43D');
        $this->addSql('DROP INDEX IDX_8A8E0C1367B3B43D ON satisfaction');
        $this->addSql('ALTER TABLE satisfaction ADD answer VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, DROP users_id');
        $this->addSql('ALTER TABLE user ADD satisfactions_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649221512A2 FOREIGN KEY (satisfactions_id) REFERENCES satisfaction (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649221512A2 ON user (satisfactions_id)');
    }
}
