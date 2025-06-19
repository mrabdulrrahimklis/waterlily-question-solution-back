import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Answer, CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const { type, answers, ...rest } = createQuestionDto;

      const question = await this.prisma.question.create({
        data: {
          ...rest,
          type: type ?? 'answer',
          ...(type !== 'answer' && {
            answers: {
              create: answers.map((answer) => ({
                content: answer.content,
                isCorrect: answer.isCorrect ?? false,
              })),
            },
          }),
        },
      });

      return question;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const questions = await this.prisma.question.findMany({
        include: {
          answers: {
            select: {
              content: true,
            },
          },
        },
      });

      return questions;
    } catch (e) {
      throw new InternalServerErrorException('Failed to fetch question');
    }
  }

  async findOne(id: number) {
    try {
      const questions = await this.prisma.question.findUnique({
        where: { id },
        include: {
          answers: true,
        },
      });

      return questions;
    } catch (e) {
      throw new InternalServerErrorException('Failed to fetch question');
    }
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    try {
      const questions = await this.prisma.question.update({
        where: { id },
        data: {
          ...updateQuestionDto,
          answers: {
            create: updateQuestionDto.answers.map((answer) => ({
              content: answer.content,
              isCorrect: answer.isCorrect ?? false,
            })),
          },
        },
      });

      return questions;
    } catch (e) {
      throw new InternalServerErrorException('Failed to fetch question');
    }
  }

  async remove(id: number) {
    try {
      const question = await this.prisma.question.delete({
        where: { id },
      });

      return question;
    } catch (e) {
      throw new InternalServerErrorException('Failed to delete quesiton');
    }
  }
}
