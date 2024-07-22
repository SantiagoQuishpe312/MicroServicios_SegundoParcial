import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseDetailsComponent } from './course-details.component';
import { CoursesService } from 'src/app/core/http/courses/courses.service';
import { UsersService } from 'src/app/core/http/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Courses } from 'src/app/types/courses.types';
import { Users } from 'src/app/types/users.types';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CourseDetailsComponent', () => {
  let component: CourseDetailsComponent;
  let fixture: ComponentFixture<CourseDetailsComponent>;
  let coursesService: jasmine.SpyObj<CoursesService>;
  let usersService: jasmine.SpyObj<UsersService>;
  let matDialog: jasmine.SpyObj<MatDialog>;
  let matSnackBar: jasmine.SpyObj<MatSnackBar>;
  let activatedRoute: ActivatedRoute;

  const mockCourse: Courses = {
    id: 1,
    nombre: 'Curso 1',
    cursoUsuarios: [
      { id: 1, usuarioId: 1 },
      { id: 2, usuarioId: 2 }
    ]
  };

  const mockUsers: Users[] = [
    { id: 1, nombre: 'Usuario 1', email: 'usuario1@example.com', password: "123456" },
    { id: 2, nombre: 'Usuario 2', email: 'usuario2@example.com', password: "123456" }
  ];

  beforeEach(async () => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['getById', 'matricular', 'desmatricular']);
    const usersServiceSpy = jasmine.createSpyObj('UsersService', ['getById']);
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    // Simula ActivatedRoute con un observable para params
    const activatedRouteStub = {
      params: of({ id: 1 })
    };

    await TestBed.configureTestingModule({
      declarations: [CourseDetailsComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy },
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
    }).compileComponents();

    coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    matDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    matSnackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(CourseDetailsComponent);
    component = fixture.componentInstance;

    coursesService.getById.and.returnValue(of(mockCourse));
    usersService.getById.and.callFake((id: number) => of(mockUsers.find(user => user.id === id) as Users));
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });


 
});
