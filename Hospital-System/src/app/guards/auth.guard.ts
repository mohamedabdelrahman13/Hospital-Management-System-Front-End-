import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService)

  if(authService.isLoggedIn()){
    if(authService.isTokenExpired()){
      authService.logoutWithExpiry();
      return router.createUrlTree(['/login']);
    }

    return true
  }

  else{
    toastr.info('Please log in to continue');
    return router.createUrlTree(['/login']);
  }

};
