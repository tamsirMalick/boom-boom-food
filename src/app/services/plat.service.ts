import { Injectable } from '@angular/core';
import { Plat } from '../models/plat';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatService {

  constructor(private http: HttpClient) { }

  public addPlat(plat: Plat): Observable<Plat> {
    return this.http.post<Plat>(environment.URL + '/plats', plat).pipe();
  }

  public deletePlat(id: number): Observable<Plat> {
    return this.http.delete<Plat>(environment.URL + '/plats/' + id).pipe();
  }

  public update(plat: Plat): Observable<Plat> {
    return this.http.put<Plat>(environment.URL + '/plats/' + plat.id, plat).pipe();
  }

  public getAll(): Observable<Plat[]> {
    return this.http.get<Plat[]>(environment.URL + '/plats').pipe();
  }

  public getPlat(id: number): Observable<Plat> {
    return this.http.get<Plat>(environment.URL + '/plats/' + id);
  }

}

