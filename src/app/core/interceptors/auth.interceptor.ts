import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    withCredentials: true // Asegura que las credenciales se envíen en cada solicitud
  });

  return next(clonedRequest);
};
