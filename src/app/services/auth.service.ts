import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { meData } from '../operations/query';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { MeData } from '../components/me/me.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public accessVar = new Subject<boolean>();
  public accessVar$ = this.accessVar.asObservable();
  constructor(private apollo: Apollo, private router: Router) { }

  public updateStateSession(newValue: boolean) {
    this.accessVar.next(newValue);
  }

  // Obtener nuestro usuario y datos con el token
  getMe() {
    return this.apollo
    .watchQuery(
      {
        query: meData,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: localStorage.getItem('tokenJWT')
          })
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.me;
    }));
  }

  start() {
    if (localStorage.getItem('tokenJWT') !== null) {
      this.getMe().subscribe((result: MeData) => {
        if (result.status) {
          if (this.router.url === '/login') {
            this.router.navigate(['/me']);
          }
        }
        this.updateStateSession(result.status);
      });
    } else {
      this.updateStateSession(false);
    }
  }

  logout() {
    localStorage.removeItem('tokenJWT');
    this.updateStateSession(false);
    const routeSelect = this.router.url;
    if (routeSelect !== '/users' && routeSelect !== '/register') {
      this.router.navigate(['/login']);
    }
  }
}
