import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';

export enum QuestionType {
  BULLET = 'bullet',
  ANSWER = 'answer',
  CHECKBOX = 'checkbox',
}

export class Answer {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsBoolean()
  isCorrect: boolean;
}

export class CreateQuestionDto {
  @ApiProperty()
  @IsNumber()
  poolId: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({ type: [Answer] })
  @IsArray()
  @Type(() => Answer)
  answers: Answer[];
}
