import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Case } from 'src/entities/case.entity';
import { CaseUpdate } from 'src/entities/case-update.entity';
import { CreateCaseUpdateDto } from './dto/create-case-update.dto';

@Injectable()
export class LawyerCasesService {
  constructor(
    @InjectRepository(Case) private caseRepository: Repository<Case>,
    @InjectRepository(CaseUpdate) private updateRepository: Repository<CaseUpdate>,
  ) {}

  findMyCases(userId: string, query: { status?: string }) {
    const findOptions = { where: { lawyer: { id: userId } }, relations: ['client'] };
    if (query.status) {
      findOptions.where['status'] = query.status;
    }
    return this.caseRepository.find(findOptions);
  }

  async findMyCaseById(userId: string, caseId: string) {
    const caseItem = await this.caseRepository.findOne({
      where: { id: caseId, lawyer: { id: userId } },
      relations: ['client', 'updates'],
    });
    if (!caseItem) throw new NotFoundException('Case not found or not assigned to you.');
    return caseItem;
  }

  async addCaseUpdate(caseId: string, dto: CreateCaseUpdateDto) {
    const caseItem = await this.caseRepository.findOneBy({ id: caseId });
    if (!caseItem) throw new NotFoundException('Case not found.');

    const newUpdate = this.updateRepository.create({
      case: caseItem,
      updateText: dto.updateText,
    });
    return this.updateRepository.save(newUpdate);
  }
}