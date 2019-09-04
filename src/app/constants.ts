import { User } from './models';

export const USERS: User[] = [
  {
    status: 'admin',
    accessRights: {
      addStudent: true,
      editStudent: true,
      deleteStudent: true,
      addSchoolObject: true,
      editSchoolObject: true,
      deleteSchoolObject: true,
      addLesson: true,
      deleteLesson: true,
      addMark: true,
    }
  },
  {
    status: 'teacher',
    accessRights: {
      addStudent: false,
      editStudent: false,
      deleteStudent: false,
      addSchoolObject: false,
      editSchoolObject: false,
      deleteSchoolObject: false,
      addLesson: false,
      deleteLesson: false,
      addMark: true,
    }
  },
  {
    status: 'student',
    accessRights: {
      addStudent: false,
      editStudent: false,
      deleteStudent: false,
      addSchoolObject: false,
      editSchoolObject: false,
      deleteSchoolObject: false,
      addLesson: false,
      deleteLesson: false,
      addMark: false,
    }
  },
];

export const STATUSES = [
  {
      status: 'admin',
      name: 'Администратор'
  },
  {
      status: 'teacher',
      name: 'Учитель'
  },
  {
      status: 'student',
      name: 'Ученик'
  },
];
