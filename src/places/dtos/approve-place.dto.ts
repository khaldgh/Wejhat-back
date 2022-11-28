import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ApprovePlaceDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsBoolean()
  approved: boolean;
  @IsNumber()
  phone: number;
  @IsString()
  website: string;
  @IsString()
  instagram: string;
  @IsString()
  Sunday: string;
  @IsString()
  Monday: string;
  @IsString()
  Tuesday: string;
  @IsString()
  Wednesday: string;
  @IsString()
  Thursday: string;
  @IsString()
  Friday: string;
  @IsString()
  Saturday: string;
}
