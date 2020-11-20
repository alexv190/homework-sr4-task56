import { Component, Input, OnInit } from '@angular/core';
import { LessonRecord, Student } from '../app.component';

@Component({
  selector: 'app-grade-table',
  templateUrl: './grade-table.component.html',
  styleUrls: ['./grade-table.component.css']
})
export class GradeTableComponent implements OnInit {
  @Input('lessonRecords') lessonRecords: Array<LessonRecord> = [];
  @Input('students') students: Array<Student> = []; 
  
  constructor() { }

  ngOnInit(): void {
  }

  sel(student:Student, index:number, grade:any) {
    const gradeAsInt = parseInt(grade, 10);
    student.grades[index] = gradeAsInt;
    student.calcAvgGrades();
    // const studentIndex = this.students.indexOf(student)
    // this.students[studentIndex] = new Student(student.name, student.grades, student.average, student.rounded, student.additional);
    console.log(student, index, gradeAsInt)
  }

}
