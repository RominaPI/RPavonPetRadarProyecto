import { Module } from '@nestjs/common';
import { FoundPetService } from './found-pet.service';
import { FoundPetController } from './found-pet.controller';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoundPet } from 'src/core/database/entities/foundPet.entity';
import { LostPet } from 'src/core/database/entities/lostPet.entity';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([FoundPet, LostPet])],
  providers: [FoundPetService],
  controllers: [FoundPetController]
})
export class FoundPetModule {}
