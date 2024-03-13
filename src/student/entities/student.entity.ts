import { Exam } from "src/exam/entities/exam.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
   @PrimaryGeneratedColumn()
   id:number
   
   @Column()
   firstName:string

   @Column()
   lastName:string
  
   @OneToMany(()=>Exam, exam=>exam.student,{ onDelete: 'CASCADE' })
   exams:Exam[]

   @Column({nullable:true})
   totalMarks:number

   @Column({nullable:true})
   average:number

    
}


