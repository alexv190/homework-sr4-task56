export class LessonRecord {
    constructor(
      public id: number,
      public number: number,
      public date: Date,
      public topic: string,
      public hometask: string,
      public additional: string
    ) {
    }
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
      let gradeCount = 0;
      for (let grade of this.grades) {
        sum += grade;
        if (grade > 0) {
          gradeCount++;
        }
      }
      this.average = sum / gradeCount;
      this.rounded = Math.round(sum / gradeCount);
    }
  
    updateGrade(gradeIndex: number, grade: number) {
      this.grades[gradeIndex] = grade;
      this.calcAvgGrades();
    }
  }