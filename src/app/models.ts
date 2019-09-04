export interface Mark {
  id: number;
  mark: number | string;
}

export interface SchoolObject {
  id: number;
  name: string;
  selected: boolean;
}

export interface Lesson {
  id: number;
  id_schoolObject: number;
  students: Mark[];
}

export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  middle_name?: string;
  selected: boolean;
}

export interface User {
  status: string;
  accessRights: {
    addStudent: boolean;
    editStudent: boolean;
    deleteStudent: boolean;
    addSchoolObject: boolean;
    editSchoolObject: boolean;
    deleteSchoolObject: boolean;
    addLesson: boolean;
    deleteLesson: boolean;
    addMark: boolean;
  };
}


