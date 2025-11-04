import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Case, CaseStatus } from 'src/entities/case.entity';
import { Review } from 'src/entities/review.entity';
import { CreateCaseDto } from './dto/create-case.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ClientCasesService {
  constructor(
    @InjectRepository(Case) private caseRepository: Repository<Case>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  findMyCases(userId: string) {
    return this.caseRepository.find({ where: { client: { id: userId } } });
  }

  createMyCase(userId: string, dto: CreateCaseDto) {
    const newCase = this.caseRepository.create({
      ...dto,
      client: { id: userId },
      lawyer: { id: dto.lawyerId },
    });
    return this.caseRepository.save(newCase);
  }

  async findMyCaseById(userId: string, caseId: string) {
    const caseItem = await this.caseRepository.findOne({
      where: { id: caseId, client: { id: userId } },
      relations: ['lawyer', 'updates', 'review'],
    });
    if (!caseItem) throw new NotFoundException('Case not found or you do not own it.');
    return caseItem;
  }

  async cancelMyCase(userId: string, caseId: string) {
    const caseItem = await this.findMyCaseById(userId, caseId);
    caseItem.status = CaseStatus.CANCELLED; // Assuming CANCELLED enum member exists
    return this.caseRepository.save(caseItem);
  }

  async addReview(userId: string, caseId: string, dto: CreateReviewDto) {
    const caseItem = await this.findMyCaseById(userId, caseId);
    if (caseItem.status !== CaseStatus.CLOSED) {
      throw new ForbiddenException('Can only review closed cases.');
    }
    const newReview = this.reviewRepository.create({
      ...dto,
      case: caseItem,
      client: { id: userId },
      lawyer: caseItem.lawyer,
    });
    return this.reviewRepository.save(newReview);
  }
}