import { Component, Input, OnInit } from '@angular/core';
import { LessonRecord, Student } from '../model';

@Component({
  selector: 'app-study-table',
  templateUrl: './study-table.component.html',
  styleUrls: ['./study-table.component.css'],
})
export class StudyTableComponent {
  @Input() lessonRecords: Array<LessonRecord> = [];
  @Input() students: Array<Student> = [];
  editingLesson: LessonRecord;

  constructor() {}

  ngOnInit(): void {
    let number = 1;
    let id = 1;
    const IdAndNumber = this.determineNextIdAndNumber();
    id = IdAndNumber[0];
    number = IdAndNumber[1];
    this.editingLesson = this.createNewLesson(id, number);
  }

  private determineNextIdAndNumber() {
    if (this.lessonRecords == null || this.lessonRecords.length == 0) {
      return [1,1];
    }
    const lastElement = this.lessonRecords[this.lessonRecords.length - 1];
    const number = lastElement.number + 1;
    const maxId =
      this.lessonRecords
        .map((lesson) => lesson.id)
        .sort()
        .reverse()[0] + 1;
    return [maxId, number];
  }

  addNewLesson() {
    this.editingLesson.number = +this.editingLesson.number; //convert to int
    const editingLessonDesiredNumber = this.editingLesson.number;
    const numberAlreadyAdded = this.lessonRecords.find((lesson) => {
      return lesson.number == editingLessonDesiredNumber;
    });
    if (numberAlreadyAdded) {
      alert('Ошибка. Такой номер урока уже используется');
      return;
    }
    this.lessonRecords.push(this.editingLesson);
    //соритруем после каждого добавления по номеру урока
    this.lessonRecords.sort((lesson1, lesson2) => {
      return lesson1.number < lesson2.number
        ? -1
        : lesson1.number == lesson2.number
        ? 0
        : 1;
    });
    this.addGradesToStudends();
    const IdAndNumber = this.determineNextIdAndNumber();
    this.editingLesson = this.createNewLesson(IdAndNumber[0], IdAndNumber[1]);
  }

  delete(lessonId: number) {
    const lessonToDelete = this.lessonRecords.find((lesson) => {
      return lesson.id == lessonId;
    });
    if (lessonToDelete != null) {
      const deleteIndex = this.lessonRecords.indexOf(lessonToDelete)
      this.lessonRecords.splice(deleteIndex, 1);
      for (let student of this.students) {
        student.grades.splice(deleteIndex, 1)
      }
      console.log('удален ', lessonToDelete);
    } else {
      alert('Ошибка');
    }
  }

  private addGradesToStudends() {
    const lessonsCount = this.lessonRecords.length;
    for (let student of this.students) {
      while (student.grades.length < lessonsCount) {
        student.grades.push(0);
      }
      student.calcAvgGrades();
    }
  }

  private createNewLesson(id: number, number: number) {
    return new LessonRecord(id, number, new Date(), '', '', '');
  }
}
