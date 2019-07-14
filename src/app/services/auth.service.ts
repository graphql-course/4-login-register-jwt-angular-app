import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { meData } from '../operations/query';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public accessVar = new Subject<boolean>();
  public accessVar$ = this.accessVar.asObservable();
  constructor(private apollo: Apollo) { }

  public updateAccess(newBooleanVar: boolean) {
    this.accessVar.next(newBooleanVar);
  }

  // nuestra info con el token
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
}
