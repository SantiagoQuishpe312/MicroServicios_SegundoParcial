import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>Confirmar eliminación</h1>
    <div mat-dialog-content>¿Estás seguro de que quieres eliminar este estudiante?</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-button color="warn" (click)="onConfirm()">Eliminar</button>
    </div>
  `
})
export class DeleteConfirmationDialogComponent {
  constructor(private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
