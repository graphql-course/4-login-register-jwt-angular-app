import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getUsers, login } from '../operations/query';
import { map } from 'rxjs/operators';

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

}
