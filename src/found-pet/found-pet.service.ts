import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoundPet } from 'src/core/database/entities/foundPet.entity';
import { LostPet } from 'src/core/database/entities/lostPet.entity';
import { EmailOptions } from 'src/core/interfaces/email-options.interface'
import { FoundPetDTO } from 'src/core/interfaces/foundPet-DTO.interface';
import { generatePetEmailTemplate} from 'src/found-pet/found-email.template';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';

@Injectable()
export class FoundPetService {
    constructor(
        @InjectRepository(LostPet)
        private readonly lostPetRepository: Repository<LostPet>,
        @InjectRepository(FoundPet)
        private readonly foudPetRepository: Repository<FoundPet>,
        private readonly emailService: EmailService
    ){}
    async createFoundPet(foundPet: FoundPetDTO): Promise<Boolean>{
        const newPet = this.foudPetRepository.create({
            species: foundPet.species,
            breed: foundPet.breed,
            color: foundPet.color,
            size: foundPet.size,
            description: foundPet.description,
            photo_url: foundPet.photo_url,
            finder_name: foundPet.finder_name,
            finder_email: foundPet.finder_email,
            finder_phone: foundPet.finder_phone,
            location: {
                type: 'Point',
                coordinates: [foundPet.location.lon, foundPet.location.lat]
            },
            address: foundPet.address
        });

        await this.foudPetRepository.save(newPet);
        const lostPets: LostPet[] = await this.lostPetRepository.query(`
       SELECT *,
    ST_X(location::geometry) AS lon,
    ST_Y(location::geometry) AS lat,
    ST_Distance(
        location,
        ST_SetSRID(ST_MakePoint(${foundPet.location.lon}, ${foundPet.location.lat}), 4326)::geography
    ) AS distance
    FROM lost_pet
    WHERE is_active = true
    AND ST_DWithin(
        location,
        ST_SetSRID(ST_MakePoint(${foundPet.location.lon}, ${foundPet.location.lat}), 4326)::geography,
        500
    )
    ORDER BY distance ASC
        `) as LostPet[];

        if (lostPets.length == 0) {
            return false;
        }

        for (const lostPet of lostPets) {
            const template = generatePetEmailTemplate(newPet, lostPet);
            const options: EmailOptions = {
                to: lostPet.owner_email,
                subject: '¡Encontramos una mascota cerca de donde perdiste a la tuya!',
                html: template
            };
            const res = await this.emailService.sendEmail(options);
            return res;
        }
        
        return true;
    }
}