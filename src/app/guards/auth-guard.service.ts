import { Injectable } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { MeData } from '../components/me/me.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthorizationService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Auth Guard');
    console.log(next.url);
    if (localStorage.getItem('tokenJWT') !== null) {
      console.log('access granted');
      return true;
    }
    console.log('redirect');
    // navigate to login page
    this.router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
