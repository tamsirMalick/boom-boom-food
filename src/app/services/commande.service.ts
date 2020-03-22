import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Commande} from '../models/commande';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../models/user';

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
  validateCommande(commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(environment.URL + '/commandes/' + commande.id, commande).pipe();
  }
  removeCommande(id: number): Observable<Commande> {
    return this.http.delete<Commande>(environment.URL + '/commandes/' + id).pipe();
  }
  getUserCommande(id: number): Observable<Commande> {
    return this.http.get<Commande>(environment.URL + '/commandes/' + id).pipe();
  }
}
