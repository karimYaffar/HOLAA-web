import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { throwError } from 'rxjs';

export abstract class BaseService {
  protected readonly SERVER = environment.BASE_URL;

  protected abstract httpOptions: {};

  constructor(protected readonly http: HttpClient) {}

  protected handleError(error: HttpErrorResponse) {
    console.error(error);

    let errorMessage = 'Algo salió mal, por favor intente de nuevo.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.error.error) {
        errorMessage = `${error.error.error.message}`;
      } else {
        errorMessage = `${error.error.message}`;
      }
      
    }

    return throwError(() => new Error(errorMessage));
  }
}
