/* eslint-disable prettier/prettier */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { Courses } from 'src/app/types/courses.types';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  
  const mockCourses: Courses[] = [
    { id: 1, nombre: 'Matemáticas', cursoUsuarios: [] },
    { id: 2, nombre: 'Ciencias', cursoUsuarios: [] }
  ];

  const mockCourse: Courses = {
    id: 1,
    nombre: 'Matemáticas',
    cursoUsuarios: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });

    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Iniciar el Servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Recuperar todos los cursos', () => {
    service.getAll().subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(`${service['URL']}/getAll`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('Obtener un curso por su ID', () => {
    service.getById(1).subscribe(course => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${service['URL']}/getById/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);
  });

  it('Deberia crear un curso', () => {
    service.create(mockCourse).subscribe();

    const req = httpMock.expectOne(`${service['URL']}/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCourse);
    req.flush({});
  });

  it('Deberia Actualizar un curso', () => {
    service.update(1, mockCourse).subscribe(course => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${service['URL']}/update/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockCourse);
    req.flush(mockCourse);
  });

  it('Deberia eliminar un curso', () => {
    service.delete(1).subscribe();

    const req = httpMock.expectOne(`${service['URL']}/delete/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('Deberia matricular a un usuario en un curso', () => {
    const userData = { usuarioId: 13 };
    service.matricular(1, userData).subscribe();

    const req = httpMock.expectOne(`${service['URL']}/asignar-usuario/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(userData);
    req.flush({});
  });

  it('Deberia desmatricular a un usuario de un curso', () => {
    service.desmatricular(1, 13).subscribe();

    const req = httpMock.expectOne(`${service['URL']}/eliminar-del-curso/1/usuario/13`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
