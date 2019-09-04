import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { capitalize } from 'lodash';
import { DataService } from '../data.service';
import { Student, Lesson } from '../models';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  form;
  students: Student[] = [];
  currentStudentId: number;
  currentStudent;
  indexStudent: number;
  idStudentsSubject = 0;
  lessons: Lesson[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.initForm();
    this.getData();
  }

  getData() {
    this.idStudentsSubject = DataService.getIdStudentsSubject() ? DataService.getIdStudentsSubject() : 0;
    this.students = DataService.getStudents() ? DataService.getStudents() : [];
    this.lessons = DataService.getLessons() ? DataService.getLessons() : [];
  }

  initForm() {
    this.form = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      middle_name: new FormControl('', [Validators.required]),
    });
  }

  get hasStudents() {
    return !!(this.students && this.students.length);
  }

  addStudent() {
    const ids = this.idStudentsSubject + 1;
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setValue(capitalize(this.form.get(key).value));
    });
    this.students.push(
      {id: ids, ...this.form.value, selected: false}
    );
    if (this.lessons && this.lessons.length) {
      for (const lesson of this.lessons) {
        lesson.students.push({id: ids, mark: ''});
      }
    }
    this.form.reset();
    for (const initStud of this.students) {
      if (initStud.selected) {
        initStud.selected = false;
      }
    }
    this.idStudentsSubject = ids;
    DataService.setStudentInStorage(this.students);
    DataService.setLessonsInStorage(this.lessons);
    DataService.setIdStudentsSubjectsInStorage(this.idStudentsSubject);
  }

  deleteStudent() {
    this.students.splice(this.indexStudent, 1);
    DataService.setStudentInStorage(this.students);
    if (this.lessons && this.lessons.length) {
      for (const lesson of this.lessons) {
        lesson.students.splice(this.indexStudent, 1);
      }
    }
    this.currentStudent = undefined;
    this.form.reset();
    DataService.setLessonsInStorage(this.lessons);
  }

  editStudent() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setValue(capitalize(this.form.get(key).value));
    });
    this.students[this.indexStudent] = {id: this.currentStudent.id, ...this.form.value, selected: true};
    DataService.setStudentInStorage(this.students);
  }

  offOtherCheck(student, id, selected) {
    const initStudents = this.students.filter(initStud => initStud.id !== id);
    for (const initStud of initStudents) {
      if (initStud.selected) {
        initStud.selected = false;
      }
    }
    if (selected) {
      this.currentStudent = student;
      this.indexStudent = this.students.indexOf(student);
      const selectStudent = this.students.filter(stud => stud.id === id);
      this.currentStudentId = selectStudent[0].id;
      this.form.get('first_name').setValue(selectStudent[0].first_name);
      this.form.get('last_name').setValue(selectStudent[0].last_name);
      this.form.get('middle_name').setValue(selectStudent[0].middle_name);
    } else {
      this.currentStudentId = 0;
      this.currentStudent = undefined;
      this.form.reset();
    }
  }
}
