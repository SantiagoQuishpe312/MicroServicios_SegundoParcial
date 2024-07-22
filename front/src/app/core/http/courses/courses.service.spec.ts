/* eslint-disable prettier/prettier */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { Courses } from 'src/app/types/courses.types';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  // Mock data
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all courses', () => {
    service.getAll().subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(`${service['URL']}/getAll`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should get course by id', () => {
    service.getById(1).subscribe(course => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${service['URL']}/getById/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);
  });

  it('should create a course', () => {
    service.create(mockCourse).subscribe();

    const req = httpMock.expectOne(`${service['URL']}/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCourse);
    req.flush({});
  });

  it('should update a course', () => {
    service.update(1, mockCourse).subscribe(course => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${service['URL']}/update/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockCourse);
    req.flush(mockCourse);
  });

  it('should delete a course', () => {
    service.delete(1).subscribe();

    const req = httpMock.expectOne(`${service['URL']}/delete/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should enroll a user in a course', () => {
    const userData = { usuarioId: 13 };
    service.matricular(1, userData).subscribe();

    const req = httpMock.expectOne(`${service['URL']}/asignar-usuario/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(userData);
    req.flush({});
  });

  it('should unenroll a user from a course', () => {
    service.desmatricular(1, 13).subscribe();

    const req = httpMock.expectOne(`${service['URL']}/eliminar-del-curso/1/usuario/13`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
