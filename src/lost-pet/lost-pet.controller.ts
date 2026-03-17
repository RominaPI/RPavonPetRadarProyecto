import { Body, Controller, Post } from '@nestjs/common';
import type { LostPetDTO } from 'src/core/interfaces/lostPet-DTO.interface';
import { LostPetService } from './lost-pet.service';

@Controller('lost-pet')
export class LostPetController {
    constructor(
        private readonly losPetService: LostPetService
    ){}
    
    @Post()
    async createLostPet(@Body() lostPet: LostPetDTO){
        const res = await this.losPetService.createLostPet(lostPet);
        return res;
    }
}

