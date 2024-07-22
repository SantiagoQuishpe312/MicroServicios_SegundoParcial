import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  template:`<h1 mat-dialog-title>Confirmar eliminación</h1>
  <div mat-dialog-content>
    <p>¿Estás seguro de que deseas eliminar este curso?</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onCancel()">Cancelar</button>
    <button mat-button color="warn" (click)="onConfirm()">Eliminar</button>
  </div>
  `,
  styleUrls: ['./courses.component.scss']
})
export class DeleteConfirmationDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
