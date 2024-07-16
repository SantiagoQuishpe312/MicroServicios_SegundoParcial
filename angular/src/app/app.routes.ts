import { NgModule } from '@angular/core';

import { ProductosComponent } from './pages/product/productos';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home.component';
export const routes: Routes = [
{    path: 'productos', component: ProductosComponent },
{path:'home',component: Home}];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],declarations: [
        ProductosComponent,Home
      ],
    
  })
  export class AppRoutingModule { }