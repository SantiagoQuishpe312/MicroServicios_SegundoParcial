/* eslint-disable prettier/prettier */
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courses } from 'src/app/types/courses.types';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly URL = environment.appApiUrl1 + '/cursos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Courses[]> {
    return this.http.get<Courses[]>(`${this.URL + "/getAll"}`);
  }
  getById(id: number): Observable<Courses> {
    return this.http.get<Courses>(`${this.URL}/getById/${id}`);
  }

  create(formData: Courses): Observable<any> {
    return this.http.post(`${this.URL}/add`, formData);
  }

  update(id: number, formData: Courses): Observable<Courses> {
    return this.http.put<Courses>(`${this.URL}/update/${id}`, formData);
  }

  delete(id:number):Observable<any>{
    return this.http.delete(`${this.URL}/delete/${id}`);
  }
  matricular(id:number,formData:any): Observable<any>{
    return this.http.put<any>(`${this.URL}/asignar-usuario/${id}`, formData);
  }
}
