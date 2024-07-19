import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/http/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentDialogComponent {
  studentForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddStudentDialogComponent>,
    private fb: FormBuilder,
    private userService: UsersService,
    private snackBar: MatSnackBar
  ) {
    this.studentForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.userService.create(this.studentForm.value).subscribe(
        response => {
          this.snackBar.open('Guardado exitosamente', 'Cerrar', {
            duration: 3000, // Duración en milisegundos
          });
          this.dialogRef.close(this.studentForm.value);
          console.log(this.studentForm.value);
        },
        error => {
          this.snackBar.open('Error al guardar', 'Cerrar', {
            duration: 3000,
          });
          console.error('Error al guardar', error);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
