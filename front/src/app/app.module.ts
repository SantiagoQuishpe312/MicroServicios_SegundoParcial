import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import localeES from '@angular/common/locales/es-419';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreModule } from 'src/app/core/core.module';
import { MainLayoutModule } from 'src/app/layout/main-layout.module';
import { AuthModule } from 'src/app/core/auth/auth.module';
import { TokenInterceptorService } from './core/interceptors/token-interceptor.service';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions
} from '@angular/material/form-field';
import { HotToastModule } from '@ngneat/hot-toast';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { registerLocaleData } from '@angular/common';
import { getSpanishPaginatorIntl } from 'src/app/core/utils/paginator-util';
import { GlobalConstant } from 'src/app/core/constant/global-constant';
import { MAT_DATE_LOCALE } from '@angular/material/core';
//import { LoaderInterceptor } from 'src/app/core/interceptors/loader.interceptor';
import { GlobalErrorHandlerService } from 'src/app/core/services/global-error-handler.service';
import { FormsModule } from '@angular/forms';
// import { DegreeComponent } from './modules/main/pages/degree/degree.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
registerLocaleData(localeES, GlobalConstant.LOCAL_CODE);
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StudentListComponent } from './modules/main/pages/estudiantes/estudiantes.component';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CourseDetailsComponent } from './modules/main/pages/estudiantes-curso/course-details.component';
@NgModule({
  declarations: [AppComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,

    // Vex
    VexModule,
    MainLayoutModule,
    CoreModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,MatDialogModule, ReactiveFormsModule, MatFormFieldModule,MatInputModule,
    MatSnackBarModule,
    HotToastModule.forRoot()
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true,
      },
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoaderInterceptor,
    //   multi: true
    // },
    {
      provide: LOCALE_ID,
      useValue: GlobalConstant.LOCAL_CODE
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: GlobalConstant.LOCAL_CODE
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
