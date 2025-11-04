import { IsDateString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
class AvailabilitySlot {
  @IsDateString() startTime: string;
  @IsDateString() endTime: string;
}
export class UpdateScheduleDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabilitySlot)
  availableSlots: AvailabilitySlot[];
}