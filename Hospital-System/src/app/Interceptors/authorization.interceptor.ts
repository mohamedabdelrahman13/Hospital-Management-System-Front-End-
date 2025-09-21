import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/authService/auth.service';
import { inject } from '@angular/core';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  let modifiedReq = req;


  //add the authorization header for all requests except login...
  if(!req.url.includes('login')){
    modifiedReq = req.clone({
      headers: req.headers.append('authorization' , `Bearer ${authService.getToken()}`)
    }) 
  }

  return next(modifiedReq);
};
