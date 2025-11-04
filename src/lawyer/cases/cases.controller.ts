import { Controller, Get, Post, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { LawyerCasesService } from './cases.service';
import { CreateCaseUpdateDto } from './dto/create-case-update.dto';

@Controller('lawyer/cases')
export class LawyerCasesController {
  constructor(private readonly casesService: LawyerCasesService) {}

  @Get()
  getMyCases(@Query('status') status?: string) {
    return this.casesService.findMyCases('mock-lawyer-id', { status });
  }

  @Get(':id')
  getMyCaseDetails(@Param('id', ParseUUIDPipe) id: string) {
    return this.casesService.findMyCaseById('mock-lawyer-id', id);
  }

  @Post(':id/updates')
  addCaseUpdate(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CreateCaseUpdateDto) {
    return this.casesService.addCaseUpdate(id, dto);
  }
}