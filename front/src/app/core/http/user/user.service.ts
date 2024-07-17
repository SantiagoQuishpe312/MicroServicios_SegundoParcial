/* eslint-disable prettier/prettier */
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from 'src/app/types/users.types';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly URL = environment.appApiUrl + '/usuarios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.URL + "/getAll/"}`);
  }
  getById(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.URL}/getById/${id}`);
  }

  create(formData: Users): Observable<any> {
    return this.http.post(`${this.URL}/add`, formData);
  }

  update(id: number, formData: Users): Observable<Users> {
    return this.http.put<Users>(`${this.URL}/update/${id}`, formData);
  }
}
