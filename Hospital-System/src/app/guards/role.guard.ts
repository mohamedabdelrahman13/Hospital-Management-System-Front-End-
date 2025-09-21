import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { ToastrService } from 'ngx-toastr';

export const roleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService)

  // roles which validate the route
  const expectedRoles = route.data['roles'] as string[];
  const userRole = authService.getUserRoles(); 

  //check if the roles of current user included in the allowed roles (expectedRoles) or not......
  if((userRole.some(role => expectedRoles.map(r => r.toLowerCase()).includes(role.toLowerCase())))){
    return true;
  }
  else{
    toastr.error('unauthorized !')
    return router.createUrlTree(['/unauthorized'])
  }

};
