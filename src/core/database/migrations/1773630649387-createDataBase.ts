import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDataBase1773630649387 implements MigrationInterface {
    name = 'CreateDataBase1773630649387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lost_pet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "species" character varying NOT NULL, "breed" character varying NOT NULL, "color" character varying NOT NULL, "size" character varying NOT NULL, "description" character varying NOT NULL, "photo_url" character varying NOT NULL, "owner_name" character varying NOT NULL, "owner_email" character varying NOT NULL, "owner_phone" character varying NOT NULL, "location" geometry(Point,4326) NOT NULL, "address" character varying NOT NULL, "lost_date" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e93154f3c554bba19e3515f1269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "found_pet" ("id" SERIAL NOT NULL, "species" character varying NOT NULL, "breed" character varying NOT NULL, "color" character varying NOT NULL, "size" character varying NOT NULL, "description" character varying NOT NULL, "photo_url" character varying NOT NULL, "finder_name" character varying NOT NULL, "finder_email" character varying NOT NULL, "finder_phone" character varying NOT NULL, "location" geometry(Point,4326) NOT NULL, "address" character varying NOT NULL, "lost_date" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_71a8770507298fc9e00d94f8236" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "found_pet"`);
        await queryRunner.query(`DROP TABLE "lost_pet"`);
    }

}
