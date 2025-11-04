import { Controller, Post, Body } from '@nestjs/common';
import { ClientConsultationsService } from './consultations.service';
import { BookConsultationDto } from './dto/book-consultation.dto';

@Controller('client/consultations')
export class ClientConsultationsController {
  constructor(private readonly consultationsService: ClientConsultationsService) {}

  @Post()
  bookConsultation(@Body() dto: BookConsultationDto) {
    return this.consultationsService.book('mock-client-id', dto);
  }
}