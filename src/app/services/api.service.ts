import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getUsers, login } from '../operations/query';
import { map } from 'rxjs/operators';
import { RegisterData } from '../components/register/register.interface';
import { addUser } from '../operations/mutation';

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

  addUser(user: RegisterData) {
    return this.apollo
      .mutate({
        mutation: addUser,
        variables: {
          user
        }
      });
  }

}
