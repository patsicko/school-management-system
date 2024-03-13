import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Exam } from 'src/exam/entities/exam.entity';
import { CreateExamDto } from 'src/exam/dto/create-exam.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {

    const student = await this.studentRepository.save(createStudentDto);
    return student;
  }

  async createStudentExam(studentId:number,createExamDto: CreateExamDto): Promise<Exam> {
    
    const student = await this.studentRepository.findOne({where:{id:studentId}});
  
    if (!student) {
      throw new Error("Student not found");
    }

    console.log("student",student)
    
    const exam = this.examRepository.create({ ...createExamDto, student });
    return await this.examRepository.save(exam);
  }
  


  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find({ relations: ['exams'] });
  }

  async calculateMarks():Promise<Student[]>{
    let students= await this.studentRepository.find({ relations: ['exams'] });

    

    students.map(student => {

     
      calculateGradesAndAverage(student)
      

    }
      )

    return students;
  }

  async findOne(id: number): Promise<Student |string| null  > {
    const student = await this.studentRepository.findOne({ where: { id }, relations: ['exams'] });

    if (!student) {
      return "Student not found";
    }
    return student;
  }

  async update(id:number,updateStudentDto: UpdateStudentDto): Promise<any> {
    const student = await this.studentRepository.findOne({ where: {id} });
    if (!student) {
      throw new Error("Student not found");
    }
    const updated = await this.studentRepository.update(id, updateStudentDto);
    return updated;
  }

  async remove(id: number): Promise<any> {
    return this.studentRepository.delete(id);
  }

  async findAllExams(): Promise<Exam[]> {
    return await this.examRepository.find({ relations: ['student'] });
  }



}


function calculateGradesAndAverage(student: Student): any {

      let totalMarksInternal = 0;
      let totalMarksExternal = 0;


    const calculateGrade = (marks: number, examType: string): string => {

      console.log("marks: ",marks)
      console.log("examType: ",examType)

      if (examType === 'Internal'|| examType === 'internal') {
        if (marks >= 80) return 'A';
        else if (marks >= 70) return 'B';
        else if (marks >= 60) return 'C';
        else if (marks >= 50) return 'D';
        else if (marks >= 40) return 'E';
        else return 'F';
      } else if (examType === 'External' || examType === 'external') {
        if (marks >= 80) return 'A';
        else if (marks >= 60) return 'B';
        else if (marks >= 50) return 'C';
        else if (marks >= 40) return 'D';
        else if (marks >= 30) return 'E';
        else return 'F';
      } else {
        return 'Unknown';
      }
    };




    student.exams.forEach(exam => {


     const grade= calculateGrade(exam.marks,exam.type);

     console.log("grade",grade)

    exam.grade=grade



      if (exam.type === 'Internal' || exam.type === 'internal') {
        
        totalMarksInternal += exam.marks;
      } else if (exam.type === 'External' || exam.type === 'external') {
        totalMarksExternal += exam.marks;
      }
      
    });

  student.totalMarks=totalMarksInternal+totalMarksExternal

  const average = student.totalMarks / (student.exams.length * 2);
  student.average=average
  
  return student;
}

