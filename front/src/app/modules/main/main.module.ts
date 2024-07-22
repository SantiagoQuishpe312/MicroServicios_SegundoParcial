import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { StudentListComponent } from './pages/estudiantes/estudiantes.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddStudentDialogComponent } from './pages/estudiantes/add-student.component';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoursesListComponent } from './pages/cursos/courses.component';
import { AddCourseDialogComponent } from './pages/cursos/add-course.component';
import { CourseDetailsComponent } from './pages/estudiantes-curso/course-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importa MatProgressSpinnerModule
import { MatSelectModule } from '@angular/material/select';
import { EnrollStudentDialogComponent } from './pages/estudiantes-curso/enroll-student-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@NgModule({
  declarations: [
    MainComponent,
    
    StudentListComponent,AddStudentDialogComponent,CoursesListComponent,
    AddCourseDialogComponent,
    CourseDetailsComponent,
    EnrollStudentDialogComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,MatButtonModule,MatCardModule,
    MatTableModule,MatIconModule,MatDialogModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule,MatProgressSpinnerModule,
    MatSelectModule,MatAutocompleteModule
  ]
})
export class MainModule { }
