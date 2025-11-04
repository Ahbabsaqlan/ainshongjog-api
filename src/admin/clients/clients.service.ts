import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User, UserRole } from 'src/auth/entities/user.entity';
import { UpdateClientStatusDto } from './dto/update-client-status.dto';

@Injectable()
export class AdminClientsService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  findAll(query: { search?: string }) {
    const findOptions = { where: { role: UserRole.CLIENT } };
    if (query.search) {
      findOptions.where['fullName'] = Like(`%${query.search}%`);
    }
    return this.userRepository.find(findOptions);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id, role: UserRole.CLIENT });
    if (!user) throw new NotFoundException('Client not found');
    return user;
  }
  
  // NOTE: For this to work, you MUST add `@Column({ default: true }) isActive: boolean;` to your User entity.
  async updateStatus(id: string, dto: UpdateClientStatusDto) {
    const result = await this.userRepository.update({ id, role: UserRole.CLIENT }, { isActive: dto.isActive });
    if (result.affected === 0) throw new NotFoundException('Client not found');
    return this.findOne(id);
  }

  async getStats() {
    const totalUsers = await this.userRepository.count();
    const totalLawyers = await this.userRepository.count({ where: { role: UserRole.LAWYER } });
    const totalClients = await this.userRepository.count({ where: { role: UserRole.CLIENT } });
    return { totalUsers, totalLawyers, totalClients };
  }
}