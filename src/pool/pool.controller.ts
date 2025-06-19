import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
} from '@nestjs/common';
import { PoolService } from './pool.service';
import { CreatePoolDto, CreateSubmitDto } from './dto/create-pool.dto';

@Controller('pool')
export class PoolController {
  constructor(private readonly poolService: PoolService) {}

  @Post()
  async create(@Body() createPoolDto: CreatePoolDto) {
    try {
      const pool = await this.poolService.create(createPoolDto);

      return { succeess: true, data: pool };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('submit')
  async submit(@Body() createSubmit: CreateSubmitDto) {
    try {
      const pool = await this.poolService.submit(createSubmit);

      return { succeess: true, data: pool };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const pools = await this.poolService.findAll();

      return { succeess: true, data: pools };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.poolService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
