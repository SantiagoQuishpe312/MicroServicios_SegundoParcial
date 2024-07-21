import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent} from './pages/main/main.component';
import { EjemploComponent } from './pages/ejemplo/ejemplo.component';
import { DegreeComponent } from './pages/degree/degree.component';
import { StudentListComponent } from './pages/estudiantes/estudiantes.component';
import { CoursesListComponent } from './pages/cursos/courses.component';
import { CourseDetailsComponent } from './pages/estudiantes-curso/course-details.component';
const routes: Routes = [
  {
    path: 'adm_est',
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
  },
  {
    path:'courses',
    component:CoursesListComponent
  },
  {
    path:'course-details/:id',
    component:CourseDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
