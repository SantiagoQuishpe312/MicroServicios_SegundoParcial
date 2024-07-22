import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentListComponent } from './estudiantes.component';
import { UsersService } from 'src/app/core/http/user/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Users } from 'src/app/types/users.types';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;
  let usersService: jasmine.SpyObj<UsersService>;
  let matDialog: jasmine.SpyObj<MatDialog>;
  let matSnackBar: jasmine.SpyObj<MatSnackBar>;

  const mockStudents: Users[] = [
    { id: 1, nombre: 'Estudiante 1', email: 'estudiante1@example.com' ,password:"123456"},
    { id: 2, nombre: 'Estudiante 2', email: 'estudiante2@example.com',password:"123456" }
  ];

  beforeEach(async () => {
    const usersServiceSpy = jasmine.createSpyObj('UsersService', ['getAll', 'getById', 'delete']);
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [StudentListComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule, NoopAnimationsModule],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy }
      ],
    }).compileComponents();

    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    matDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    matSnackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;

    usersService.getAll.and.returnValue(of(mockStudents));
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los estudiantes al iniciar', () => {
    fixture.detectChanges();

    expect(usersService.getAll).toHaveBeenCalled();
    expect(component.students.length).toBe(2);
  });

  it('debería abrir el diálogo de edición de estudiante', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    matDialog.open.and.returnValue(dialogRefSpyObj);
    usersService.getById.and.returnValue(of(mockStudents[0]));

    component.editStudent(1);

    expect(usersService.getById).toHaveBeenCalledWith(1);
    dialogRefSpyObj.afterClosed().subscribe(() => {
      expect(component.getAllStudents).toHaveBeenCalled();
      expect(matSnackBar.open).toHaveBeenCalledWith('Estudiante editado correctamente', 'Cerrar', {
        duration: 3000
      });
    });
  });

  it('debería manejar error al abrir el diálogo de edición de estudiante', () => {
    usersService.getById.and.returnValue(throwError('Error'));

    component.editStudent(1);

    expect(usersService.getById).toHaveBeenCalledWith(1);
    expect(matSnackBar.open).toHaveBeenCalledWith('Error al cargar el estudiante', 'Cerrar', {
      duration: 3000
    });
  });

  it('debería eliminar un estudiante', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    matDialog.open.and.returnValue(dialogRefSpyObj);
    usersService.delete.and.returnValue(of({}));

    component.deleteStudent(1);

    dialogRefSpyObj.afterClosed().subscribe(() => {
      expect(usersService.delete).toHaveBeenCalledWith(1);
      expect(component.getAllStudents).toHaveBeenCalled();
      expect(matSnackBar.open).toHaveBeenCalledWith('Estudiante eliminado correctamente', 'Cerrar', {
        duration: 3000
      });
    });
  });

  it('debería manejar error al eliminar un estudiante', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    matDialog.open.and.returnValue(dialogRefSpyObj);
    usersService.delete.and.returnValue(throwError('Error'));

    component.deleteStudent(1);

    dialogRefSpyObj.afterClosed().subscribe(() => {
      expect(usersService.delete).toHaveBeenCalledWith(1);
      expect(matSnackBar.open).toHaveBeenCalledWith('Error al eliminar el estudiante', 'Cerrar', {
        duration: 3000
      });
    });
  });

  it('debería agregar un estudiante', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    matDialog.open.and.returnValue(dialogRefSpyObj);

    component.addStudent();

    dialogRefSpyObj.afterClosed().subscribe(() => {
      expect(component.getAllStudents).toHaveBeenCalled();
      expect(matSnackBar.open).toHaveBeenCalledWith('Estudiante agregado correctamente', 'Cerrar', {
        duration: 3000
      });
    });
  });

  it('debería manejar error al agregar un estudiante', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: throwError('Error') });
    matDialog.open.and.returnValue(dialogRefSpyObj);

    component.addStudent();

    dialogRefSpyObj.afterClosed().subscribe(() => {
      expect(matSnackBar.open).toHaveBeenCalledWith('Error al agregar el estudiante', 'Cerrar', {
        duration: 3000
      });
    });
  });
});
