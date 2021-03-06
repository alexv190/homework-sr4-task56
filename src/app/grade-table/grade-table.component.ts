import { Component, Input, OnInit } from '@angular/core';
import { LessonRecord, Student } from '../model';

@Component({
  selector: 'app-grade-table',
  templateUrl: './grade-table.component.html',
  styleUrls: ['./grade-table.component.css'],
})
export class GradeTableComponent implements OnInit {
  @Input() lessonRecords: Array<LessonRecord> = [];
  @Input() students: Array<Student> = []; 
  
  constructor() { }

  ngOnInit(): void {
  }

  updateGradeForStudent(student:Student, index:number, grade:any) {
    const gradeAsInt = parseInt(grade, 10);
    student.updateGrade(index, gradeAsInt)
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
