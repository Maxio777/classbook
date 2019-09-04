import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { differenceWith, isEqual, maxBy, capitalize } from 'lodash';
import { DataService } from '../data.service';
import { SchoolObject } from '../models';

@Component({
  selector: 'app-school-objects',
  templateUrl: './school-objects.component.html',
  styleUrls: ['./school-objects.component.scss']
})


export class SchoolObjectsComponent implements OnInit {
  schoolObjects = [];
  currentObjectName = '';
  indexCurrentObject: number;
  idSchoolSubjects = 0;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    if (localStorage.getItem('schoolObjects')) {
      this.schoolObjects = JSON.parse(localStorage.getItem('schoolObjects'));
    }
    if (localStorage.getItem('idSchoolSubjects')) {
      this.idSchoolSubjects = JSON.parse(localStorage.getItem('idSchoolSubjects'));
    }
  }

  setSchoolObjectsInStorage() {
    localStorage.setItem('schoolObjects', JSON.stringify(this.schoolObjects));
  }

  goToSubject(name: string) {
    this.router.navigate(['school-subjects/' + name]);
  }

  addSubjects() {
    if (this.currentObjectName) {
      const ids = this.idSchoolSubjects + 1;
      this.schoolObjects.push(
        {id: ids, name: capitalize(this.currentObjectName.trim()), selected: false}
      );
      for (const initObj of this.schoolObjects) {
        if (initObj.selected) {
          initObj.selected = false;
        }
      }
      this.idSchoolSubjects = ids;
      this.currentObjectName = '';
      this.setSchoolObjectsInStorage();
      localStorage.setItem('idSchoolSubjects', JSON.stringify(this.idSchoolSubjects));
    }

  }

  editObject() {
    this.schoolObjects[this.indexCurrentObject].name = this.currentObjectName;
    for (const initObj of this.schoolObjects) {
      if (initObj.selected) {
        initObj.selected = false;
      }
    }
    this.currentObjectName = '';
    this.setSchoolObjectsInStorage();
  }

  deleteObject() {
    this.schoolObjects.splice(this.indexCurrentObject, 1);
    this.setSchoolObjectsInStorage();
    this.indexCurrentObject = undefined;
    this.currentObjectName = '';
  }

  offOtherCheck(obj: SchoolObject) {
    const initObjects = this.schoolObjects.filter(initObj => initObj.id !== obj.id);
    for (const initObj of initObjects) {
      if (initObj.selected) {
        initObj.selected = false;
      }
    }
    if (obj.selected) {
      this.currentObjectName = obj.name;
      this.indexCurrentObject = this.schoolObjects.indexOf(obj);
    } else {
      this.currentObjectName = '';
      this.indexCurrentObject = undefined;
    }
  }

  get hasSchoolObjects(): boolean  {
    return !!(this.schoolObjects && this.schoolObjects.length);
  }

  get hasCurrentIndex(): boolean {
    return this.indexCurrentObject >= 0;
  }

}
