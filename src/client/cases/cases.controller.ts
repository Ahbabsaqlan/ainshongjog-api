import { Controller, Get, Post, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ClientCasesService } from './cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('client/cases')
export class ClientCasesController {
  constructor(private readonly casesService: ClientCasesService) {}

  @Get()
  getMyCases() { return this.casesService.findMyCases('mock-client-id'); }

  @Post()
  createMyCase(@Body() dto: CreateCaseDto) {
    return this.casesService.createMyCase('mock-client-id', dto);
  }

  @Get(':id')
  getMyCaseDetails(@Param('id', ParseUUIDPipe) id: string) {
    return this.casesService.findMyCaseById('mock-client-id', id);
  }

  @Delete(':id')
  cancelMyCase(@Param('id', ParseUUIDPipe) id: string) {
    return this.casesService.cancelMyCase('mock-client-id', id);
  }

  @Post(':id/review')
  addReview(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CreateReviewDto) {
    return this.casesService.addReview('mock-client-id', id, dto);
  }
}