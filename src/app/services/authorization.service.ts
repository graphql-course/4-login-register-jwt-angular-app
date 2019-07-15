import { Injectable } from '@angular/core';
import { meData } from '../operations/query';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Subject } from 'rxjs/internal/Subject';
import { MeData } from '../components/me/me.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  // Para compartir información
  public accessVar = new Subject<boolean>();
  public accessVar$ = this.accessVar.asObservable();
  constructor(private apollo: Apollo, private router: Router) { }

  public updateBooleanSubject(newBooleanVar: boolean) {
    this.accessVar.next(newBooleanVar);
  }

  start() {
    this.getMe().subscribe((result: MeData) => {
      console.log(this.router.url);
      if (result.status) {
        console.log('ok');
        if (this.router.url === '/login') {
          console.log('go to personal page!!');
          this.router.navigate(['/me']);
        }
      } else {

      }
      console.log(result.status);
      this.updateBooleanSubject(result.status);
    });
  }

  logout() {
    localStorage.removeItem('tokenJWT');
    this.updateBooleanSubject(false);
    const currentRouter = this.router.url;
    if (currentRouter !== '/users' && currentRouter !== '/register') {
      this.router.navigate(['/login']);
    }
  }

  getMe() {
    return this.apollo
      .watchQuery(
        {
          query: meData,
          fetchPolicy: 'network-only',
          context: {
            headers: new HttpHeaders({
              authorization: (localStorage.getItem('tokenJWT') !== null) ? localStorage.getItem('tokenJWT') : ''
            })
          }
        }
      ).valueChanges.pipe(map((result: any) => {
        return result.data.me;
      }));
  }
}


