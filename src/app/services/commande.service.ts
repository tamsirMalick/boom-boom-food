import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Commande} from '../models/commande';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http: HttpClient) { }
  addCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(environment.URL + '/commandes', commande).pipe();
  }
  getAllCommande(): Observable<Commande[]> {
    return this.http.get<Commande[]>(environment.URL + '/commandes').pipe();
  }
  removeCommande(id: number): Observable<Commande> {
    return this.http.delete<Commande>(environment.URL + '/commande/' + id).pipe();
  }
}
