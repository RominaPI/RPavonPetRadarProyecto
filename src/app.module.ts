import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { FoundPetModule } from './found-pet/found-pet.module';
import { LostPetModule } from './lost-pet/lost-pet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './core/database/datasource';

@Module({
  imports: [EmailModule, FoundPetModule, LostPetModule, TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
