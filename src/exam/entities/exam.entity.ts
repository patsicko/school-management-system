import { Student } from "src/student/entities/student.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    id:number
    
    @ManyToOne(()=>Student, student=>student.exams,{ onDelete: 'CASCADE' })
    student:Student

    @Column()
    subject:string

    @Column()
    marks:number

    @Column({type:'enum',enum:['internal','external']})
    type:string

    @Column({nullable:true})
    grade:string

}
