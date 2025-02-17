import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

export const serviceInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("----------------------------------------------")
  console.log('Informe de peticion');
  console.log('Endpoint', req.url);
  console.log('Peticion', req.method);
  console.log('Credenciales?', req.withCredentials ? 'Si' : 'No');
  console.log('Cuerpo de peticion', req.body || {});
  return next(req).pipe(
    map((event) => {
      if (event instanceof HttpResponse) {
        console.log('Informe de respuesta');
        console.log("Estado:", event.statusText)
        console.log("Estado HTTP:", event.status);
        console.log("Endpoint", event.url);
        console.log("----------------------------------------------")
      }
      return event;
    }),
  );
  
};
