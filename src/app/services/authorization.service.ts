import { Injectable } from '@angular/core';
import { meData } from '../operations/query';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  // Para compartir información
  public accessVar = new Subject<boolean>();
  public accessVar$ = this.accessVar.asObservable();
  constructor(private apollo: Apollo) { }

  public updateBooleanSubject(newBooleanVar: boolean) {
    this.accessVar.next(newBooleanVar);
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


