import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  private toast: HotToastService;
  constructor(private injector: Injector, private zone: NgZone) {}

  handleError(error: any) {
    this.toast = this.injector.get(HotToastService);
    console.error('Error from global error handler', error);
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }

    if (error) {
      let errorMessage = error.message;

      if (error?.status === 0) {
        errorMessage = 'No se pudo conectar con el servidor';
      } else {
        errorMessage = error.error ? error.error.message : error.message;
      }

      if (
        error.error &&
        error.error.invalidParameters !== undefined &&
        error.error.invalidParameters !== null &&
        error.error.invalidParameters.length > 0
      ) {
        errorMessage += '\n';

        errorMessage += JSON.stringify(error.error.invalidParameters, null, 2);
      }

      this.zone.run(() => this.toast.error(errorMessage));
    }
  }
}
