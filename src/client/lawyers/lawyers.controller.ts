import { Controller, Get, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ClientLawyersService } from './lawyers.service';

@Controller('client/lawyers')
export class ClientLawyersController {
  constructor(private readonly lawyersService: ClientLawyersService) {}

  @Get()
  searchLawyers(@Query('specialization') specialization?: string, @Query('location') location?: string) {
    return this.lawyersService.search({ specialization, location });
  }

  @Get(':id')
  getLawyerPublicProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.lawyersService.getPublicProfile(id);
  }
}