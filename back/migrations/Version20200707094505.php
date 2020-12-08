<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200707094505 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE idea_mood (idea_id INT NOT NULL, mood_id INT NOT NULL, INDEX IDX_C0701B5D5B6FEF7D (idea_id), INDEX IDX_C0701B5DB889D33E (mood_id), PRIMARY KEY(idea_id, mood_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE idea_mood ADD CONSTRAINT FK_C0701B5D5B6FEF7D FOREIGN KEY (idea_id) REFERENCES idea (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE idea_mood ADD CONSTRAINT FK_C0701B5DB889D33E FOREIGN KEY (mood_id) REFERENCES mood (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE mood_idea');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE mood_idea (mood_id INT NOT NULL, idea_id INT NOT NULL, INDEX IDX_3DF9FC495B6FEF7D (idea_id), INDEX IDX_3DF9FC49B889D33E (mood_id), PRIMARY KEY(mood_id, idea_id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE mood_idea ADD CONSTRAINT FK_3DF9FC495B6FEF7D FOREIGN KEY (idea_id) REFERENCES idea (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE mood_idea ADD CONSTRAINT FK_3DF9FC49B889D33E FOREIGN KEY (mood_id) REFERENCES mood (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE idea_mood');
    }
}
