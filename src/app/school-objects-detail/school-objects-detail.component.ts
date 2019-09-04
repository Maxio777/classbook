import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { maxBy, mapValues, concat } from 'lodash';
import { Student, Mark, SchoolObject, Lesson } from '../models';
import { DataService } from '../data.service';


@Component({
  selector: 'app-school-objects-detail',
  templateUrl: './school-objects-detail.component.html',
  styleUrls: ['./school-objects-detail.component.scss']
})
export class SchoolObjectsDetailComponent implements OnInit {
  schoolObjects: SchoolObject[];
  currentObject: SchoolObject;
  students: Mark[] = [];
  studentsAll: Student[] = [];
  currentLessons: Lesson[] = [];
  lessons = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.schoolObjects = DataService.getSchoolObjects();
    this.detectObject();
    this.prepareSt();
    this.getLessons();
  }

  addMark(event, indStudent: number, indLesson: number) {
    this.currentLessons[indLesson].students[indStudent].mark = event.target.value;
    DataService.setLessonsInStorage(this.lessons);
  }

  getStudentName(id: number) {
    const student = this.studentsAll.filter(stud => stud.id === id);
    return student[0].last_name + ' ' + student[0].first_name[0] + '. ' + student[0].middle_name[0] + '.';
  }

  getLessons() {
      this.lessons = DataService.getLessons() ? DataService.getLessons() : [];
      this.currentLessons = this.lessons.filter(lesson => lesson.id_schoolObject === this.currentObject.id);
  }

  detectObject() {
    if (this.schoolObjects) {
      this.route.params.subscribe(params => {
        this.currentObject = this.schoolObjects.filter(obj => obj['name'] === params['name'])[0];
      });
    }
  }

  prepareSt() {
    if (localStorage.getItem('students')) {
      this.studentsAll = DataService.getStudents();
      const student = this.studentsAll.map(stud => [{id: stud.id, mark: '' }]);
      for (const stud of student) {
        this.students.push(stud[0]);
      }
    }
  }

  deleteLesson(index: number) {
    const indexForDel = this.lessons.findIndex(lesson => lesson.id === this.currentLessons[index].id);
    this.lessons.splice(indexForDel, 1);
    DataService.setLessonsInStorage(this.lessons);
    this.getLessons();
  }

  addLesson() {
    let idl = 1;
    if (this.hasLessons) {
      idl = maxBy(this.lessons, 'id').id + 1;
    }
    this.lessons.push(
      { id: idl, id_schoolObject: this.currentObject.id, students: this.students}
    );
    this.currentLessons = this.lessons.filter(lesson => lesson.id_schoolObject === this.currentObject.id);
    DataService.setLessonsInStorage(this.lessons);
  }

  goTo(direct) {
    this.router.navigate([direct]);
  }

  get hasLessons() {
    return !!(this.lessons && this.lessons.length);
  }
}
