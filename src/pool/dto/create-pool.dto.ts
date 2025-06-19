import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreatePoolDto {
  @ApiProperty()
  @IsString()
  name: string;
}

export class CreateSubmitDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  poolId: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  answers: string[];
}
