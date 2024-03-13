import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Exam } from "src/exam/entities/exam.entity";
import { Entity } from "typeorm";


export class CreateStudentDto {
    
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
