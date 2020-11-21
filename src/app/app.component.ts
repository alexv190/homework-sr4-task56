import { Component } from '@angular/core';
import { LessonRecord, Student } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'homework-sr4-task56';
  lessonRecords: Array<LessonRecord> = [];
  students: Array<Student> = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const loadedLessons = JSON.parse(localStorage.getItem('lessons'));
    if (loadedLessons != null) {
      this.lessonRecords = loadedLessons.map((x:LessonRecord) => Object.assign(new LessonRecord(x.id, x.number, x.date, x.topic, x.hometask, x.additional), x));;
      console.log('загружены lessonRecords',  this.lessonRecords)
    } else {
      console.log('не загружены lessonRecords',  this.lessonRecords)
    }
    const loadedStudents = JSON.parse(localStorage.getItem('students'));
    if (loadedStudents == null) {
      this.students.push(this.generateNewStudent('Петров', 'Отличник'));
      this.students.push(this.generateNewStudent('Иванов', 'Хорошист'));
      this.students.push(this.generateNewStudent('Сидоров', 'Отличник'));
      console.log('не загружены lessonRecords',  this.students)
    } else {
      this.students = loadedStudents.map((x:Student) => Object.assign(new Student(x.name, x.grades, x.average, x.rounded, x.additional)));
      console.log('загружены students',  this.students)
    }
  }

  saveData() {
    localStorage.setItem('lessons', JSON.stringify(this.lessonRecords));
    localStorage.setItem('students', JSON.stringify(this.students));
  }

  private generateNewStudent(name: string, additional: string): Student {
    return new Student(name, new Array<number>(), 0, 0, additional);
  }
}


