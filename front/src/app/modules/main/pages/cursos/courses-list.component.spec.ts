import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesListComponent } from './courses.component';
import { CoursesService } from 'src/app/core/http/courses/courses.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Courses } from 'src/app/types/courses.types';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let coursesService: jasmine.SpyObj<CoursesService>;
  let matDialog: jasmine.SpyObj<MatDialog>;
  let matSnackBar: jasmine.SpyObj<MatSnackBar>;
  let router: jasmine.SpyObj<Router>;

  const mockCourses: Courses[] = [
    { id: 1, nombre: 'Curso 1', cursoUsuarios: [] },
    { id: 2, nombre: 'Curso 2', cursoUsuarios: [] },
  ];

  beforeEach(async () => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['getAll', 'delete']);
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    matDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    matSnackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería obtener todos los cursos al iniciar', () => {
    coursesService.getAll.and.returnValue(of(mockCourses));
    fixture.detectChanges();

    expect(component.courses.length).toBe(2);
    expect(coursesService.getAll).toHaveBeenCalled();
  });

  it('debería editar un curso', () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of(true));
    matDialog.open.and.returnValue(dialogRefSpyObj);

    coursesService.getAll.and.returnValue(of(mockCourses));
    spyOn(component, 'getAllCourses').and.callThrough(); // Espía a getAllCourses

    component.editCourse(1);
    dialogRefSpyObj.afterClosed().subscribe(() => {
      expect(component.getAllCourses).toHaveBeenCalled();
      expect(matSnackBar.open).toHaveBeenCalledWith('Curso editado correctamente', 'Cerrar', { duration: 3000 });
    });
  });

  it('debería eliminar un curso', () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of(true));
    matDialog.open.and.returnValue(dialogRefSpyObj);

    coursesService.delete.and.returnValue(of({}));
    coursesService.getAll.and.returnValue(of(mockCourses));
    spyOn(component, 'getAllCourses').and.callThrough(); // Espía a getAllCourses

    component.deleteCourse(1);
    dialogRefSpyObj.afterClosed().subscribe(() => {
      expect(coursesService.delete).toHaveBeenCalledWith(1);
      expect(component.getAllCourses).toHaveBeenCalled();
      expect(matSnackBar.open).toHaveBeenCalledWith('Curso eliminado correctamente', 'Cerrar', { duration: 3000 });
    });
  });

  it('debería manejar el error al eliminar un curso', () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of(true));
    matDialog.open.and.returnValue(dialogRefSpyObj);

    coursesService.delete.and.returnValue(throwError('Error'));
    coursesService.getAll.and.returnValue(of(mockCourses));

    component.deleteCourse(1);
    dialogRefSpyObj.afterClosed().subscribe(() => {
      expect(coursesService.delete).toHaveBeenCalledWith(1);
      expect(matSnackBar.open).toHaveBeenCalledWith('Error al eliminar el curso', 'Cerrar', { duration: 3000 });
    });
  });

  it('debería agregar un curso', () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of(true));
    matDialog.open.and.returnValue(dialogRefSpyObj);

    coursesService.getAll.and.returnValue(of(mockCourses));
    spyOn(component, 'getAllCourses').and.callThrough(); // Espía a getAllCourses

    component.addCourse();
    dialogRefSpyObj.afterClosed().subscribe(() => {
      expect(component.getAllCourses).toHaveBeenCalled();
      expect(matSnackBar.open).toHaveBeenCalledWith('Curso agregado correctamente', 'Cerrar', { duration: 3000 });
    });
  });

  it('debería navegar a los detalles del curso', () => {
    component.seeCourse(1);
    expect(router.navigate).toHaveBeenCalledWith(['/main/course-details', 1]);
  });
  
});
