import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/http/user/user.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentDialogComponent {
  studentForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private dialogRef: MatDialogRef<AddStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UsersService
  ) {
    this.isEditMode = !!data; // Si hay datos, estamos en modo edición
    this.studentForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      password: ['', data ? [] : Validators.required] // El campo de contraseña es opcional en modo edición
    });
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
