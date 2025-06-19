import { Injectable } from '@nestjs/common';
import { CreatePoolDto, CreateSubmitDto } from './dto/create-pool.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PoolService {
  constructor(private prisma: PrismaService) {}

  async create(createPoolDto: CreatePoolDto) {
    try {
      const pool = await this.prisma.pool.create({
        data: createPoolDto,
      });

      return pool;
    } catch (error) {
      throw new Error('Failed to create pool');
    }
  }

  async submit(createSubmitDto: CreateSubmitDto) {
    try {
      const pool = await this.prisma.submit.create({
        data: createSubmitDto,
      });

      return pool;
    } catch (error) {
      throw new Error('Failed to create pool');
    }
  }

  async findAll() {
    try {
      const pools = await this.prisma.pool.findMany({
        include: {
          questions: true,
        },
      });

      return pools;
    } catch (error) {
      throw new Error('Failed to fetch pools');
    }
  }

  async findOne(id: number) {
    try {
      const pool = await this.prisma.pool.findUnique({
        where: { id },
        include: {
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });

      if (!pool) {
        throw new Error('Pool not found');
      }

      return pool;
    } catch (error) {
      throw new Error('Failed to fetch pool');
    }
  }
}
