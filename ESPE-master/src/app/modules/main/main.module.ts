import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './pages/main/main.component';
import { EjemploComponent } from './pages/ejemplo/ejemplo.component';


@NgModule({
  declarations: [
    MainComponent,
    EjemploComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
