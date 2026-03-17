import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatelost1773721626048 implements MigrationInterface {
    name = 'Updatelost1773721626048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lost_pet" ADD "is_active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lost_pet" DROP COLUMN "is_active"`);
    }

}
