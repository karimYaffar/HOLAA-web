import { HttpInterceptorFn } from '@angular/common/http';

export const serviceInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log('Interceptando solicitud:', req);
  // console.log('Cookies a interceptar:', req.headers.get('Cookie'));
  return next(req);
};
