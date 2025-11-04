import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LawyerProfile } from 'src/entities/lawyer-profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class LawyerProfileService {
  constructor(@InjectRepository(LawyerProfile) private profileRepository: Repository<LawyerProfile>) {}

  async getMyProfile(userId: string) {
    const profile = await this.profileRepository.findOne({ where: { userId }, relations: ['user', 'specializations'] });
    if (!profile) throw new NotFoundException('Profile not found.');
    return profile;
  }

  async updateMyProfile(userId: string, dto: UpdateProfileDto) {
    const profile = await this.getMyProfile(userId);
    // Use Object.assign to merge DTO into the existing entity
    Object.assign(profile, dto);
    // Handle many-to-many relationship for specializations
    if (dto.specializationIds) {
      profile.specializations = dto.specializationIds.map(id => ({ id } as any));
    }
    return this.profileRepository.save(profile);
  }
}