import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalUser } from 'src/app/types/user.types';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalUserService {
  private readonly URL = environment.espematicoApiUrl;
  constructor(private http: HttpClient) {}

  getUserByUsername(username: string): Observable<GlobalUser> {
    return this.http.get<GlobalUser[]>(this.URL + '/username/' + username).pipe(
      map((users: GlobalUser[]) => {
        if (users.length > 0) {
          return users[0];
        }
        return null;
      })
    );
  }
}
