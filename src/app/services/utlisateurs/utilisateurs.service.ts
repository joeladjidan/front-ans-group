import { Injectable } from '@angular/core';
import {UserService} from '../user/user.service';
import {Observable, of} from 'rxjs';
import {UtilisateurDto} from '../../../gs-api/src/models/utilisateur-dto';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  constructor(
    private userService: UserService,
    private utilisateursService: UtilisateursService
  ) { }

  /*
  enregistrerUtilisateurs(categoryDto: CategoryDto): Observable<CategoryDto> {
    categoryDto.idEntreprise = this.userService.getConnectedUser()?.entreprise?.id;
    return this.categoryService.save(categoryDto);
  }
  */

  findAll(): Observable<UtilisateurDto[]> {
    return this.utilisateursService.findAll();
  }
  /*
   findById(idCategory: number): Observable<UtilisateursDto> {
     return this.categoryService.findById(idCategory);
   }

   delete(idCategorie?: number): Observable<any> {
     if (idCategorie) {
       return this.categoryService.delete(idCategorie);
     }
     return of();
   }
 */
}
