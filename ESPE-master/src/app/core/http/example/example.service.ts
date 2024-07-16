import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Example } from 'src/app/types/example.types';


@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  private readonly URL = environment.appApiUrl + '/example';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Example[]> {
    return this.http.get<Example[]>(`${this.URL + "/getAll"}`);
  }

}
