import { CursoUsuario } from './userCourse.types';

export interface Courses {
    id: number;
    nombre: string;
    cursoUsuarios: CursoUsuario[];
  }
  