import { Component } from '@angular/core';

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
    this.students.push(this.generateNewStudent('Петров', 'Отличник'));
    this.students.push(this.generateNewStudent('Иванов', 'Хорошист'));
    this.students.push(this.generateNewStudent('Горячева', 'Отличник'));
  }

  addNewLesson(lesson: LessonRecord) {
    const id = this.lessonRecords.length + 1;
    this.lessonRecords.push(lesson);
    this.addGradesToStudends();
  }

  private addGradesToStudends() {
    for (let student of this.students) {
      student.grades.push(4);
      student.calcAvgGrades();
    }
  }

  private generateNewStudent(name: string, additional: string): Student {
    return new Student(name, new Array<number>(), 0, 0, additional);
  }
}

export class LessonRecord {
  constructor(
    public id: number,
    public number: number,
    public date: Date,
    public topic: string,
    public hometask: string,
    public additional: string
  ) {}
}

export class Student {
  constructor(
    public name: string,
    public grades: Array<number>,
    public average: Number,
    public rounded: Number,
    public additional: string
  ) {}

  calcAvgGrades() {
    let sum: number = 0;
    for (let grade of this.grades) {
      sum += grade;
    }
    this.average = sum / this.grades.length;
    this.rounded = Math.floor(sum / this.grades.length);
  }

  updateGrade(gradeIndex:number, grade:number) {
    this.grades[gradeIndex] = grade;
    this.calcAvgGrades();
  }
}
