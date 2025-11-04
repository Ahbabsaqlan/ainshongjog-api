import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LawyerProfile, VerificationStatus } from 'src/entities/lawyer-profile.entity';

@Injectable()
export class ClientLawyersService {
  constructor(@InjectRepository(LawyerProfile) private profileRepository: Repository<LawyerProfile>) {}

  async search(query: { specialization?: string; location?: string }) {
    const qb = this.profileRepository.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .leftJoinAndSelect('profile.specializations', 'spec')
      .where('profile.verificationStatus = :status', { status: VerificationStatus.VERIFIED });

    if (query.specialization) {
      qb.andWhere('spec.name ILIKE :specName', { specName: `%${query.specialization}%` });
    }

    const profiles = await qb.getMany();

    // CORRECTED SANITIZATION:
    return profiles.map(profile => { 
      const { passwordHash, ...safeUser } = profile.user;
      return { ...profile, user: safeUser };
    });
  }

  async getPublicProfile(id: string) {
    const profile = await this.profileRepository.findOne({
      where: { userId: id, verificationStatus: VerificationStatus.VERIFIED },
      relations: ['user', 'specializations'],
    });
    if (!profile) throw new NotFoundException('Verified lawyer not found');
    
    // CORRECTED SANITIZATION:
    const { passwordHash, ...safeUser } = profile.user;
    
    return { ...profile, user: safeUser };
  }
}