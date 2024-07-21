import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/http/user/user.service';
import { Users } from 'src/app/types/users.types';
import { AddStudentDialogComponent } from './add-student.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  students: Users[] = [];

  constructor(
    private userService: UsersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.userService.getAll().subscribe((data: Users[]) => {
      this.students = data;
    });
  }

  editStudent(id: number) {
    this.userService.getById(id).subscribe((student) => {
      const dialogRef = this.dialog.open(AddStudentDialogComponent, {
        data: { id: student.id } // Pasa el ID del estudiante para la edición
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getAllStudents();
          this.snackBar.open('Estudiante editado correctamente', 'Cerrar', {
            duration: 3000
          });
        }
      });
    });
  }
  

  deleteStudent(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(id).subscribe(
          () => {
            this.getAllStudents();
            this.snackBar.open('Estudiante eliminado correctamente', 'Cerrar', {
              duration: 3000
            });
          },
          error => {
            this.snackBar.open('Error al eliminar el estudiante', 'Cerrar', {
              duration: 3000
            });
            console.error('Error al eliminar el estudiante', error);
          }
        );
      }
    });
  }

  addStudent() {
    console.log("abierto")
    const dialogRef = this.dialog.open(AddStudentDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllStudents(); // Refresh the list after adding a new student
        this.snackBar.open('Estudiante agregado correctamente', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }
}
