import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }
 canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   console.log('Auth Guard');
   if (localStorage.getItem('tokenJWT') !== null) {
     return true;
   }
   console.log('redirect');
   // navigate to login page
   this.router.navigate(['/login']);
   // you can save redirect url so after authing we can move them back to the page they requested
   return false;
 }

}
