import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultation } from 'src/entities/consultation.entity';
import { BookConsultationDto } from './dto/book-consultation.dto';

@Injectable()
export class ClientConsultationsService {
  constructor(@InjectRepository(Consultation) private consultRepository: Repository<Consultation>) {}

  // A real app would get the fee from the lawyer's profile
  async book(userId: string, dto: BookConsultationDto) {
    const newConsultation = this.consultRepository.create({
      ...dto,
      client: { id: userId },
      lawyer: { id: dto.lawyerId },
      consultationFee: 5000, // Placeholder fee
    });
    return this.consultRepository.save(newConsultation);
  }
}