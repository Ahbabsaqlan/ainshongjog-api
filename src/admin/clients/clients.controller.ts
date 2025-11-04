import { Controller, Get, Param, Patch, Body, Query, ParseUUIDPipe } from '@nestjs/common';
import { AdminClientsService } from './clients.service';
import { UpdateClientStatusDto } from './dto/update-client-status.dto';

@Controller('admin/clients')
export class AdminClientsController {
  constructor(private readonly clientsService: AdminClientsService) {}

  @Get('/dashboard/stats')
  getDashboardStats() { return this.clientsService.getStats(); }

  @Get()
  findAll(@Query('search') search?: string) { return this.clientsService.findAll({ search }); }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.clientsService.findOne(id); }

  @Patch(':id/status')
  updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateClientStatusDto) {
    return this.clientsService.updateStatus(id, dto);
  }
}