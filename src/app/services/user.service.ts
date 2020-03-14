import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  redirectUrl: string;
  constructor(private http: HttpClient) { }
  public addUSer(user: User): Observable<User> {
    return this.http.post<User>(environment.URL + '/auth/local/register', user).pipe();
  }
  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.URL + '/users/' + user.id, user).pipe();
  }
  public deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(environment.URL + '/users/' + id).pipe();
  }
  public getUser(id: number): Observable<User> {
    return this.http.get<User>(environment.URL + '/users/' + id).pipe();
  }
  public login(user: User): Observable<any> {
    return this.http.post(environment.URL + '/auth/local', user).pipe();
  }
}
