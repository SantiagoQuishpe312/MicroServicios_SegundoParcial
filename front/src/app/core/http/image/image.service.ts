import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly URL = environment.imageApiUrl;

  getUserImagePath(idBanner: string): string {
    return this.URL + idBanner;
  }
}
