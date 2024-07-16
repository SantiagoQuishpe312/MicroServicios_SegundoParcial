import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  urlApiProceso = environment.appApiUrl+"/example";
  constructor(private http: HttpClient) {}

  public listar(): Observable<any[]> {
    return this.http.get<any[]>(this.urlApiProceso + "/getAll").pipe(map((res) => res));;
  }}
