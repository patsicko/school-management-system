import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateExamDto } from 'src/exam/dto/create-exam.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post("create")
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Post("addExam/:id")
  createStudentExam(@Param('id') id:number,  @Body() createExamDto:CreateExamDto){
    return this.studentService.createStudentExam(id,createExamDto)
  }

  @Get("all")
  findAll() {
    return this.studentService.findAll();
  }

  @Get("calculateMarks")
  calculateMarks(){
    return this.studentService.calculateMarks()
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }


}
