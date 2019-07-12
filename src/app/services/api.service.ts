import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getUsers, login, meData } from '../operations/query';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { TOKEN_JWT } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

  // Lista de usuarios
  getUsers() {
    return this.apollo
    .watchQuery(
      {
        query: getUsers,
        fetchPolicy: 'network-only'
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.users;
    }));
  }

  // Login
  login(email: string, password: string) {
    return this.apollo
    .watchQuery(
      {
        query: login,
        variables: {
          email,
          password
        },
        fetchPolicy: 'network-only'
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.login;
    }));
  }

  // nuestra info con el tokn
  getMe() {
    return this.apollo
    .watchQuery(
      {
        query: meData,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: localStorage.getItem(TOKEN_JWT)
          })
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.me;
    }));
  }
}
