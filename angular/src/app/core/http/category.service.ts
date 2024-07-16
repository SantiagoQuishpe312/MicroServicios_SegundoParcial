import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../../types/categoria.types';
import { CaaRecord } from 'dns';

@Injectable({
    providedIn: 'root'
  })
  export class CategoriaService {
  
    private readonly URL = environment.appApiUrl + '/category';
  
    constructor(private http: HttpClient) {}
  
    getAll(): Observable<Categoria[]> {
      return this.http.get<Categoria[]>(`${this.URL + "/GetAll"}`);
    }

    getById(id: number): Observable<Categoria> {
        return this.http.get<Categoria>(`${this.URL}/GetById/${id}`);
      }
      create(categoria: Categoria): Observable<Categoria> {
        return this.http.post<Categoria>(`${this.URL}/Add`, categoria);
      }

      update(categoria: Categoria,id:number): Observable<Categoria> {
        return this.http.put<Categoria>(`${this.URL}/Update/${id}`, categoria);
      }
      delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.URL}/Delete/${id}`);
      }
  }