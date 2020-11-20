import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LessonRecord } from '../app.component';

@Component({
  selector: 'app-study-table',
  templateUrl: './study-table.component.html',
  styleUrls: ['./study-table.component.css'],
})
export class StudyTableComponent {
  @Input('lessons') lessonRecords: Array<LessonRecord> = []; 
  newLesson:LessonRecord = this.createNewLesson(0)

  constructor() {}

  addNewLesson() {
    const id = this.lessonRecords.length + 1;
    const lesson = this.newLesson
    this.lessonRecords.push(lesson);
    this.newLesson = this.createNewLesson(id);
  }

  private createNewLesson(id:number) {
    return new LessonRecord(id, id, new Date(), '','','')
  }
}

