import { Controller, Get, Put, Body } from '@nestjs/common';
import { LawyerScheduleService } from './schedule.service';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('lawyer/schedule')
export class LawyerScheduleController {
  constructor(private readonly scheduleService: LawyerScheduleService) {}

  @Get('/appointments')
  getMyAppointments() { return this.scheduleService.getAppointments('mock-lawyer-id'); }

  @Get('/availability')
  getMyAvailability() { return this.scheduleService.getAvailability('mock-lawyer-id'); }

  @Put('/availability')
  updateMyAvailability(@Body() dto: UpdateScheduleDto) {
    return this.scheduleService.updateAvailability('mock-lawyer-id', dto);
  }
}