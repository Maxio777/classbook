import { Injectable } from '@angular/core';
import { Student, SchoolObject, Lesson, User } from './models';
import { USERS } from './constants';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  users: User[] = USERS;
  currentUser: User;

  static setUsersInStorage(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  static getUsers(): User[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
    } else {
      return USERS;
    }
  }

  static setCurrentUserInStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  static getCurrentUser(): User {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  static setStudentInStorage(students: Student[]) {
    localStorage.setItem('students', JSON.stringify(students));
  }

  static setLessonsInStorage(lessons: Lesson[]) {
    localStorage.setItem('lessons', JSON.stringify(lessons));
  }

  static setIdStudentsSubjectsInStorage(idStudentsSubjects: number) {
    localStorage.setItem('idStudentsSubject', JSON.stringify(idStudentsSubjects));
  }

  static getStudents(): Student[] {
    if (localStorage.getItem('students')) {
      return JSON.parse(localStorage.getItem('students'));
    } else {
      return [];
    }
  }

  static getLessons(): Lesson[] {
    if (localStorage.getItem('lessons')) {
      return JSON.parse(localStorage.getItem('lessons'));
    } else {
      return [];
    }
  }

  static getIdStudentsSubject(): number {
    if (localStorage.getItem('idStudentsSubject')) {
      return JSON.parse(localStorage.getItem('idStudentsSubject'));
    } else {
      return 0;
    }
  }

  static getSchoolObjects(): SchoolObject[] {
    if (localStorage.getItem('schoolObjects')) {
      return JSON.parse(localStorage.getItem('schoolObjects'));
    } else {
      return [];
    }
  }

  get getCurrentUser() {
    return this.currentUser;
  }


}
