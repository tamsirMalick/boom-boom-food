import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Menu } from '../models/menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  public addMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(environment.URL + '/menus', menu).pipe();
  }

  public deleteMenu(id: number): Observable<Menu> {
    return this.http.delete<Menu>(environment.URL + '/menus/' + id).pipe();
  }

  public getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(environment.URL + '/menus').pipe();
  }
}
