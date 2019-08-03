import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router, UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from '../services';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const persona = this.authService.personaActualValor;
    if (persona) {
      if (persona.user.hasRole(next.data.role)) {
        return true;
      }
    }
    this.router.navigate(['/403']);
    return false;
  }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const persona = this.authService.personaActualValor;
        if (persona) {
            const rol = persona.user.roles.find(x => x.name === route.data.role);
            if (rol) {
                return true;
            }
        }
        this.router.navigate(['/403']);
        return false;
    }
}
