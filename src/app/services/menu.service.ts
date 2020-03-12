import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Plat } from '../models/plat';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  public addMenu(plat: Plat): Observable<Plat> {
    return this.http.post<Plat>(environment.URL + '/menus', plat).pipe();
  }

  public deleteMenu(id: number): Observable<Plat> {
    return this.http.delete<Plat>(environment.URL + '/menus/' + id).pipe();
  }

  public getMenu(): Observable<Plat[]> {
    return this.http.get<Plat[]>(environment.URL + '/menus').pipe();
  }
}
