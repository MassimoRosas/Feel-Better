<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200715073015 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_mood_date_idea (user_mood_date_id INT NOT NULL, idea_id INT NOT NULL, INDEX IDX_9612CA9E656325F (user_mood_date_id), INDEX IDX_9612CA9E5B6FEF7D (idea_id), PRIMARY KEY(user_mood_date_id, idea_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_mood_date_idea ADD CONSTRAINT FK_9612CA9E656325F FOREIGN KEY (user_mood_date_id) REFERENCES user_mood_date (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_mood_date_idea ADD CONSTRAINT FK_9612CA9E5B6FEF7D FOREIGN KEY (idea_id) REFERENCES idea (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE user_mood_date_idea');
    }
}
