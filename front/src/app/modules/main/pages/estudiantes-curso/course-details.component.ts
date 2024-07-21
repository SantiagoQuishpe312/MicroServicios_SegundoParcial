import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from 'src/app/core/http/courses/courses.component';
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
    courseId:number;
  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private userService: UsersService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.courseId=+params['id'];
      this.courseService.getById(id).subscribe(course => {
        this.course = course;
        if (course && course.cursoUsuarios) {
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
        // Añadir lógica para matricular al estudiante seleccionado
        console.log('Estudiante matriculado:', result.id);
        this.courseService.matricular(this.courseId,result).subscribe(result=>{
            console.log("registrado")
        });
        this.users.push(result);
      }
    });
  }
}
