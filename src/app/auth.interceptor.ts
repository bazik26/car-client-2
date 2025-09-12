import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('AUTH_KEY');

  req = req.clone({
    ...(!!token && {
      headers: req.headers.set(
        'Authorization',
        `${localStorage.getItem('AUTH_KEY')}`
      ),
    }),
  });

  return next(req);
};
