import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/auth/entities/user.entity';
import { LawyerProfile, VerificationStatus } from 'src/entities/lawyer-profile.entity';
import { UpdateLawyerVerificationDto } from './dto/update-lawyer-verification.dto';

@Injectable()
export class AdminLawyersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(LawyerProfile) private profileRepository: Repository<LawyerProfile>,
  ) {}

  findAll(query: { status?: string }) {
    const qb = this.profileRepository.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user');
    if (query.status) {
      qb.where('profile.verificationStatus = :status', { status: query.status });
    }
    return qb.getMany();
  }

  async findOne(id: string) {
    const profile = await this.profileRepository.findOne({ where: { userId: id }, relations: ['user', 'specializations'] });
    if (!profile) throw new NotFoundException('Lawyer profile not found');
    return profile;
  }

  async updateVerification(id: string, dto: UpdateLawyerVerificationDto) {
    const profile = await this.findOne(id);
    profile.verificationStatus = dto.status as VerificationStatus;
    return this.profileRepository.save(profile);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id, role: UserRole.LAWYER });
    if (!user) throw new NotFoundException('Lawyer not found');
    await this.userRepository.delete(id);
    return { message: `Lawyer ${id} deleted.` };
  }
}