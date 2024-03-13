import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateExamDto } from './create-exam.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Student } from 'src/student/entities/student.entity';

export class UpdateExamDto extends PartialType(CreateExamDto) {
 
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    subject: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    marks: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(['internal', 'external'])
    type: string;
}
