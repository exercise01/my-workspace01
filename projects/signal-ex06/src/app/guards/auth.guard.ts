import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../sevices/auth.service";


export const isUserAuthenticated: CanActivateFn =
  //必須ではない
  //(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isLoggedIn()) {
      return true;
    }
    else {
     return router.parseUrl('/login')
    }
  }
