import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-study-table',
  templateUrl: './study-table.component.html',
  styleUrls: ['./study-table.component.css'],
})
export class StudyTableComponent implements OnInit {
  lessonRecords: Array<LessonRecord> = [];
  @Input() newLesson:LessonRecord

  constructor() {}

  ngOnInit(): void {
    this.createNewLesson(1);
  }

  addNewLesson() {
    const id = this.lessonRecords.length + 1;
    const lesson = this.newLesson//new LessonRecord(id, id, new Date('02-03-2020'), 'a','b','c');
    this.lessonRecords.push(lesson);
    this.createNewLesson(0);
  }

  private createNewLesson(id:Number) {
    this.newLesson = new LessonRecord(id, id, new Date(), '','','')
  }
}

class LessonRecord {
  constructor(
    public id:Number,
    public number: Number,
    public date: Date,
    public topic: string,
    public hometask: string,
    public additional: string
  ) {}

}
