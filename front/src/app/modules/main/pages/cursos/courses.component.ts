import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/core/http/courses/courses.service';
import { Courses } from 'src/app/types/courses.types';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddCourseDialogComponent } from './add-course.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  courses: Courses[] = [];

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.coursesService.getAll().subscribe((data: Courses[]) => {
      this.courses = data;
    });
  }

  editCourse(id: number) {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllCourses();
        this.snackBar.open('Curso editado correctamente', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  deleteCourse(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coursesService.delete(id).subscribe(
          () => {
            this.getAllCourses();
            this.snackBar.open('Curso eliminado correctamente', 'Cerrar', {
              duration: 3000
            });
          },
          error => {
            this.snackBar.open('Error al eliminar el curso', 'Cerrar', {
              duration: 3000
            });
            console.error('Error al eliminar el curso', error);
          }
        );
      }
    });
  }

  addCourse() {
    const dialogRef = this.dialog.open(AddCourseDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllCourses();
        this.snackBar.open('Curso agregado correctamente', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  seeCourse(id: number) {
    this.router.navigate(['/main/course-details', id]);  // Redirige a la ruta de detalles del curso
  }
}
