import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/http/user/user.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentDialogComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private dialogRef: MatDialogRef<AddStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Puede ser `null` si se crea un nuevo estudiante
    private fb: FormBuilder,
    private userService: UsersService
  ) {
    this.isEditMode = !!data && !!data.id; // Verifica que `data` no sea `null` y que tenga una propiedad `id`
    this.studentForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''] // El campo de contraseña es opcional en modo edición
    });
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.userService.getById(this.data.id).subscribe((user: any) => {
        this.studentForm.patchValue({
          id: user.id, // Asegúrate de que el ID también se actualice en el formulario
          nombre: user.nombre,
          email: user.email,
          password: user.password
        });
      });
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      if (this.isEditMode) {
        this.userService.update(this.data.id, this.studentForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.userService.create(this.studentForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
