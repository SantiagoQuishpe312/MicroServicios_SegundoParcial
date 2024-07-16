import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.appApiUrl],
        sendAccessToken: false
      }
    })
  ]
})
export class AuthModule {}
