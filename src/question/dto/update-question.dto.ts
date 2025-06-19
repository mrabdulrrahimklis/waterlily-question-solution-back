import { OmitType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends OmitType(CreateQuestionDto, [
  'poolId',
] as const) {}
