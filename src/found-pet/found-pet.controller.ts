import { Body, Controller, Post } from '@nestjs/common';
import { FoundPetService } from './found-pet.service';
import type { FoundPetDTO } from 'src/core/interfaces/foundPet-DTO.interface';

@Controller('found-pet')
export class FoundPetController {
    constructor(
        private readonly foundPetService: FoundPetService
    ){}

    @Post()

    async createFoundPet(@Body() foundPet: FoundPetDTO){
        const res = await this.foundPetService.createFoundPet(foundPet);
        return res;
    }

}
    

