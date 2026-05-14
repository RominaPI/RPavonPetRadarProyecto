import { Body, Controller, Get, Post } from '@nestjs/common';
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
        const lat = foundPet.location.lat;
        const lon = foundPet.location.lon;
        this.foundPetService.getPetByRadius(lat,lon,500);
        return res;
    }

    @Get() 
    async getFoundPet(){
        const res = this.foundPetService.getFoundPets();
        return res;
    }

}
    

