import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: OAuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.authService.getAccessToken();
    if (req.headers.get("skip")) return next.handle(req);
    if (token != "") {
      const authReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token),
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
