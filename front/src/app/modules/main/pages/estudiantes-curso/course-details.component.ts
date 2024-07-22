/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/core/http/courses/courses.service';
import { UsersService } from 'src/app/core/http/user/user.service';
import { Courses } from 'src/app/types/courses.types';
import { Users } from 'src/app/types/users.types';
import { EnrollStudentDialogComponent } from './enroll-student-dialog.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  course: Courses | undefined;
  users: Users[] = [];
  isLoading: boolean = true;
  courseId: number;
  userCourseRelations: { id: number, usuarioId: number }[] = []; // To hold relation IDs

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private userService: UsersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.courseId = id;
      this.courseService.getById(id).subscribe(course => {
        this.course = course;
        if (course && course.cursoUsuarios) {
          this.userCourseRelations = course.cursoUsuarios; // Store relations
          let userRequests = course.cursoUsuarios.map(cursoUsuario => {
            return this.userService.getById(cursoUsuario.usuarioId).toPromise();
          });

          Promise.all(userRequests).then(users => {
            this.users = users;
            this.isLoading = false;
          }).catch(error => {
            console.error('Error loading users', error);
            this.isLoading = false;
          });
        } else {
          this.isLoading = false;
        }
      }, error => {
        console.error('Error loading course', error);
        this.isLoading = false;
      });
    });
  }

  enrollStudent(): void {
    const dialogRef = this.dialog.open(EnrollStudentDialogComponent, {
      width: '400px',
      data: { enrolledUsers: this.users }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Estudiante matriculado exitosamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        this.courseService.matricular(this.courseId, result).subscribe(() => {
         
          this.loadStudents(); // Reload students to include the newly enrolled user
        }, (error) => {
          console.error('Error matriculating user', error);
          this.loadStudents(); 
        });
      }
    });
  }

  removeUser(user: Users): void {
    const relation = this.userCourseRelations.find(r => r.usuarioId === user.id);
    if (relation) {
      if (confirm(`¿Estás seguro de que deseas eliminar a ${user.nombre}?`)) {
        this.snackBar.open('Usuario eliminado exitosamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        this.courseService.desmatricular(relation.id,user.id).subscribe(() => {
        
          this.loadStudents(); // Reload students to exclude the removed user
        }, (error) => {
          console.error('Error removing user', error);
          this.loadStudents();
        });
      }
    } else {
      console.error('User relation not found');
    }
  }
}
