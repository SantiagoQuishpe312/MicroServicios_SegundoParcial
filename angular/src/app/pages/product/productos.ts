import { Component, OnInit } from '@angular/core';
import { Producto } from '../../types/producto.types'; // Asegúrate de importar el modelo de Producto aquí si es necesario
import { Router } from '@angular/router';
import { ProductoService } from '../../core/http/product.service'; 
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-productos',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = []; // Array para almacenar los productos
  constructor(private router:Router, private productService:ProductoService){}
    ngOnInit(): void {
        this.getProductos();
    }
    getProductos(){
        this.productService.getAll().subscribe((data)=>{
            this.productos=data;
            console.log("test productos",this.productos);
        })
    }
 /* 

 

  createArea() {
    this.router.navigate(['main/area/create']);
  }
  
  editArea(id: number) {
    this.areaService.getById(id).subscribe(
      (area: Area) => {
        this.router.navigate(['/main/area/edit'], { state: { area } });
      },
      (error) => {
        console.error('Error al obtener los detalles del area', error);
      }
    );
  }

  deleteArea(id: number) {
    this.areaService.update(id, { estado: false }).subscribe(
      () => {
        console.log(`Area con ID ${id} eliminado correctamente`);
        this.getArea();
      },
      (error) => {
        console.error('Error al eliminar el dominio académico', error);
      }
    );
  }
  activeArea(id: number) {
    this.areaService.update(id, { estado: true }).subscribe(
      () => {
        console.log(`Area con ID ${id} eliminado correctamente`);
        this.getArea();
      },
      (error) => {
        console.error('Error al eliminar el dominio académico', error);
      }
    );
  }
  goBack() {
    this.router.navigate(['main/admin']);
  }*/
}
