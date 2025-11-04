import { Controller, Get, Param, Patch, Body, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { AdminLawyersService } from './lawyers.service';
import { UpdateLawyerVerificationDto } from './dto/update-lawyer-verification.dto';

@Controller('admin/lawyers')
export class AdminLawyersController {
  constructor(private readonly lawyersService: AdminLawyersService) {}

  @Get()
  findAll(@Query('status') status?: string) { return this.lawyersService.findAll({ status }); }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.lawyersService.findOne(id); }

  @Patch(':id/verification')
  updateVerification(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateLawyerVerificationDto) {
    return this.lawyersService.updateVerification(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.lawyersService.remove(id); }
}