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
  public userVar = new Subject<MeData>();
  public userVar$ = this.userVar.asObservable();
  constructor(private apollo: Apollo, private router: Router) { }

  public updateStateSession(newValue: boolean) {
    this.accessVar.next(newValue);
  }

  public updateUserData(newValue: MeData) {
    this.userVar.next(newValue);
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
  sincroValues(result: MeData, state: boolean) {
    this.updateUserData(result); // info del usuario
    this.updateStateSession(state); // estado de la
  }

  start() {
    // Tenemos token
    if (localStorage.getItem('tokenJWT') !== null) {
      this.getMe().subscribe((result: MeData) => {
        if (result.status) {
          if (this.router.url === '/login') {
            this.sincroValues(result, true);
            this.router.navigate(['/me']);
          }
        }
        this.sincroValues(result, result.status);
      });
    } else { // No hay token
      this.sincroValues(null, false);
    }
  }
  logout() {
    this.updateStateSession(false);
    localStorage.removeItem('tokenJWT');
    const currentRouter = this.router.url;
    if (currentRouter !== '/register' && currentRouter !== '/users') {
      this.router.navigate(['/login']);
    }
  }
}
