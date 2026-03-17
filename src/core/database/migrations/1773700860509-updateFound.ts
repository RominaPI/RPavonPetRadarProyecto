import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFound1773700860509 implements MigrationInterface {
    name = 'UpdateFound1773700860509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "found_pet" RENAME COLUMN "lost_date" TO "found_date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "found_pet" RENAME COLUMN "found_date" TO "lost_date"`);
    }

}
