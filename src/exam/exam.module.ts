import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entities/exam.entity';
import { Student } from 'src/student/entities/student.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Exam,Student])],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
