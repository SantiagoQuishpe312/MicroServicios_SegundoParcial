import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/core/auth/oauth.config';
import { TokenClaim } from 'src/app/types/token-claim.types';
import { GlobalUserService } from 'src/app/core/http/user/global-user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalUser } from 'src/app/types/user.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private globalUserSubject: BehaviorSubject<GlobalUser> =
    new BehaviorSubject<GlobalUser>(null);
  globalUser$: Observable<GlobalUser> = this.globalUserSubject.asObservable();

  constructor(
    private oAuthService: OAuthService,
    private globalUserService: GlobalUserService
  ) {
    this.configureOauthService();
  }

  get tokenClaims(): TokenClaim {
    return {
      familyName: this.oAuthService.getIdentityClaims()['family_name'],
      email: this.oAuthService.getIdentityClaims()['email'],
      givenName: this.oAuthService.getIdentityClaims()['given_name'],
      name: this.oAuthService.getIdentityClaims()['name'],
      username: this.oAuthService.getIdentityClaims()['sub'],
      preferredUsername:
        this.oAuthService.getIdentityClaims()['preferred_username']
    };
  }

  get username(): string {
    return this.oAuthService.getIdentityClaims()['sub'];
  }

  login() {
    if (!this.oAuthService.hasValidAccessToken()) {
      this.oAuthService.initImplicitFlow();
      return;
    }

    if (this.oAuthService.getIdentityClaims()) {
      this.getGlobalUser();
    }
  }

  logout() {
    this.oAuthService.logOut();
  }

  private configureOauthService() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.tryLogin({
      onTokenReceived: () => {
        this.getGlobalUser();
      }
    });
  }

  private getGlobalUser() {
    this.globalUserService
      .getUserByUsername(this.tokenClaims.username)
      .subscribe(user => {
        this.setGlobalUser(user);
      });
  }

  private setGlobalUser(user: GlobalUser) {
    // TODO: Remove this when the backend is fixed
    // user.pidm = 289444; //director
//    user.pidm = 8014; //coordinador
    this.globalUserSubject.next(user);
  }
  public capture(redirectable: string): void {
    this.oAuthService.initImplicitFlow(redirectable);
}

public redirection(): void {
  this.oAuthService.tryLogin({
      onTokenReceived: (info) => {
          window.location.href = info.state;
      }
  })
}

public obtainAccessToken() {
  this.oAuthService.initImplicitFlow();
}

public refreshToken(): void{
  console.log("entró a refreshToken")
  this.oAuthService.refreshToken();
}


public isLoggedIn(): boolean {
  if (this.oAuthService.getAccessToken() === null) {
      return false;
  }
  return true;
}

public getUserName(): string {
  const claims = this.getUserClaims();
  this.getUserInfo();
  if (claims === null) {
     // return ''
      // window.location.reload()
  } else {
      return claims['sub'].split('@')[0];
  }
}

public getUserClaims(): object {
  return this.oAuthService.getIdentityClaims();
}

public getUserInfo(): string {
  const idToken = this.oAuthService.getIdToken();
  if (idToken === null) {
      // window.location.reload();
  } else {
      return typeof idToken['sub'] !== 'undefined' ? idToken['sub'].toString() : '';
  }
}

}
