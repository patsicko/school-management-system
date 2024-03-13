import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
    @ApiProperty({
        default:"Kanyeshuri"
    })
    @IsString()
    @IsNotEmpty()
    firstName:string
    
    @ApiProperty({
        default:"Mwanafunzi"
    })
    @IsString()
    @IsNotEmpty()
    lastName:string
}
