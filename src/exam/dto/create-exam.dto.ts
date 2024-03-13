import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Student } from "src/student/entities/student.entity"

export class CreateExamDto {
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
