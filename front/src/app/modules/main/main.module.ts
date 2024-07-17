import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './pages/main/main.component';
import { EjemploComponent } from './pages/ejemplo/ejemplo.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { StudentListComponent } from './pages/estudiantes/estudiantes.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    MainComponent,
    EjemploComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,MatButtonModule,MatCardModule,
    MatTableModule,MatIconModule,MatDialogModule
  ]
})
export class MainModule { }
