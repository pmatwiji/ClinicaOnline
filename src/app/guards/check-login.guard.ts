import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../servicios/auth.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router ) {}

  canActivate(): Observable<boolean> {
    return this.authService.AFauth.authState.pipe(
      map( user => {
        if(!user) {
          this.router.navigate(['/principal']);
          return false;
        }
        return true;
      })
    );
  } 
}
