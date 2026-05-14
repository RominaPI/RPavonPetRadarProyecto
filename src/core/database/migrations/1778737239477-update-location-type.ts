import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLocationType1778737239477 implements MigrationInterface {
    name = 'UpdateLocationType1778737239477'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE lost_pet
            ALTER COLUMN location
            TYPE geography(Point,4326)
            USING location::geography;
        `);

        await queryRunner.query(`
            ALTER TABLE found_pet
            ALTER COLUMN location
            TYPE geography(Point,4326)
            USING location::geography;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE lost_pet
            ALTER COLUMN location
            TYPE geometry(Point,4326)
            USING location::geometry;
        `);

        await queryRunner.query(`
            ALTER TABLE found_pet
            ALTER COLUMN location
            TYPE geometry(Point,4326)
            USING location::geometry;
        `);
    }
}