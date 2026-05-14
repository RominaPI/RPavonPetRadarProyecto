import { Module } from '@nestjs/common';
import { LostPetService } from './lost-pet.service';
import { LostPetController } from './lost-pet.controller';
import { LostPet } from 'src/core/database/entities/lostPet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { CacheService } from 'src/cache/cache.service';
import { CacheModule } from 'src/cache/cache.module';



@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([LostPet]), CacheModule],
  providers: [LostPetService],
  controllers: [LostPetController]
})
export class LostPetModule {}
