import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {BehaviorSubject, Observable, of} from 'rxjs';
import {AuthenticationService} from '../../gs-api/src/services/authentication.service';
import {AuthenticationResponse} from '../../gs-api/src/models/authentication-response';
import {AuthenticationRequest} from '../../gs-api/src/models/authentication-request';
import {UtilisateursService} from '../../gs-api/src/services/utilisateurs.service';
import {UtilisateurDto} from '../../gs-api/src/models/utilisateur-dto';
import {ChangerMotDePasseUtilisateurDto} from '../../gs-api/src/models/changer-mot-de-passe-utilisateur-dto';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private authenticationService: AuthenticationService,
    private utilisateurService: UtilisateursService,
    private router: Router
  ) { }


  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.authenticationService.authenticate(authenticationRequest);
  }

  getUserByEmail(email?: string): Observable<UtilisateurDto> {
    if (email !== undefined) {
      return this.utilisateurService.findByEmail(email);
    }
    return of();
  }

  setAccessToken(authenticationResponse: AuthenticationResponse): void {
    localStorage.setItem('accessToken', JSON.stringify(authenticationResponse));
  }

  setConnectedUser(utilisateur: UtilisateurDto): void {
    localStorage.setItem('connectedUser', JSON.stringify(utilisateur));
  }

  getConnectedUser(): UtilisateurDto {
    if (localStorage.getItem('connectedUser')) {
      return JSON.parse(localStorage.getItem('connectedUser') as string);
    }
    return {};
  }

  changerMotDePasse(changerMotDePasseDto: ChangerMotDePasseUtilisateurDto): Observable<ChangerMotDePasseUtilisateurDto> {
    return this.utilisateurService.changerMotDePasse(changerMotDePasseDto);
  }

  isUserLoggedAndAccessTokenValid(): boolean {
    // localStorage.removeItem('accessToken');
    if (localStorage.getItem('accessToken')) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('accessToken');
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
