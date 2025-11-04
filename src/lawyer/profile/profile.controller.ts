import { Controller, Get, Put, Body } from '@nestjs/common';
import { LawyerProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('lawyer/profile')
export class LawyerProfileController {
  constructor(private readonly profileService: LawyerProfileService) {}

  @Get()
  getMyProfile() { return this.profileService.getMyProfile('mock-lawyer-id'); }

  @Put()
  updateMyProfile(@Body() dto: UpdateProfileDto) {
    return this.profileService.updateMyProfile('mock-lawyer-id', dto);
  }
}