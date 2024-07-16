import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../types/producto.types';

@Injectable({
    providedIn: 'root'
  })
  export class ProductoService {
  
    private readonly URL = environment.appApiUrl + '/product';
  
    constructor(private http: HttpClient) {}
  
    getAll(): Observable<Producto[]> {
      return this.http.get<Producto[]>(`${this.URL + "/GetAll"}`);
    }

    getById(id: number): Observable<Producto> {
        return this.http.get<Producto>(`${this.URL}/GetById/${id}`);
      }
      create(producto: Producto): Observable<Producto> {
        return this.http.post<Producto>(`${this.URL}/Add`, producto);
      }

      update(producto: Producto,id:number): Observable<Producto> {
        return this.http.put<Producto>(`${this.URL}/Update/${id}`, producto);
      }
      delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.URL}/Delete/${id}`);
      }
  }