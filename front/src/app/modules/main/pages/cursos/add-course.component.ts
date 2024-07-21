import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/core/http/courses/courses.component';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseDialogComponent implements OnInit {
  courseForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private dialogRef: MatDialogRef<AddCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private coursesService: CoursesService
  ) {
    this.isEditMode = !!data && !!data.id; // Verifica que `data` no sea `null` y que tenga una propiedad `id`
    this.courseForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
   
    });
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.coursesService.getById(this.data.id).subscribe((course: any) => {
        this.courseForm.patchValue({
          id: course.id, // Asegúrate de que el ID también se actualice en el formulario
          nombre: course.nombre,
        
        });
      });
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      if (this.isEditMode) {
        this.coursesService.update(this.data.id, this.courseForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.coursesService.create(this.courseForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
