import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoolModule } from './pool/pool.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [PoolModule, QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
