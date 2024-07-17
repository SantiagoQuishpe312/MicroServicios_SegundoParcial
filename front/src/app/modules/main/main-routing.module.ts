import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent} from './pages/main/main.component';
import { EjemploComponent } from './pages/ejemplo/ejemplo.component';
import { DegreeComponent } from './pages/degree/degree.component';
import { StudentListComponent } from './pages/estudiantes/estudiantes.component';
const routes: Routes = [
  {
    path: 'principal',
    component: MainComponent
  },
  {
    path: 'ejemplo',
    component: EjemploComponent
  },
  {
    path: 'degree',
    component: DegreeComponent
  },
  {
    path:'students',
    component:StudentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
