import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LessonRecord, Student } from '../app.component';

@Component({
  selector: 'app-study-table',
  templateUrl: './study-table.component.html',
  styleUrls: ['./study-table.component.css'],
})
export class StudyTableComponent {
  @Input() lessonRecords: Array<LessonRecord> = [];
  @Input() students: Array<Student> = [];
  editingLesson: LessonRecord = this.createNewLesson(1);

  constructor() {}

  addNewLesson() {
    const editingLessonDesiredNumber = this.editingLesson.number;
    const numberAlreadyAdded = this.lessonRecords.find((lesson) => {
      return lesson.number == editingLessonDesiredNumber;
    });
    if (numberAlreadyAdded) {
      alert('Ошибка. Такой номер урока уже используется');
      return;
    }
    this.lessonRecords.push(this.editingLesson);
    this.addGradesToStudends();
    const id = this.lessonRecords[this.lessonRecords.length - 1].number + 1;
    this.editingLesson = this.createNewLesson(id);
  }

  private addGradesToStudends() {
    const lessonsCount = this.lessonRecords.length;
    for (let student of this.students) {
      while(student.grades.length < lessonsCount) {
       student.grades.push(0);
      }
      student.calcAvgGrades();
    }
  }

  private createNewLesson(id: number) {
    return new LessonRecord(id, id, new Date(), '', '', '');
  }
}
