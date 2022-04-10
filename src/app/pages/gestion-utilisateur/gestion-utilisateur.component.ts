import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UtilisateurDto} from '../../../gs-api/src/models/utilisateur-dto';
import {UtilisateursService} from '../../../gs-api/src/services/utilisateurs.service';
import {Router} from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  moduleId: module.id,
  selector: 'gestion-utilisateur-cmp',
  templateUrl: './gestion-utilisateur.component.html',
  styleUrls: ['./gestion-utilisateur.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GestionUtilisateurComponent implements OnInit , AfterViewInit {

  listUtilisateurs: UtilisateurDto[] = [];
  dataUtilisateurList = new MatTableDataSource();
  columnsToDisplay: string[] = ['id', 'nom', 'email' , 'adresse', 'codeFiscal', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private router: Router,
    private utilisateursService: UtilisateursService
  ) {
  }

  ngOnInit(): void {
    this.findAllUtilisateurs();
  }

  ngAfterViewInit() {
    this.dataUtilisateurList.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataUtilisateurList.filter = filterValue.trim().toLowerCase();
  }

  findAllUtilisateurs(): void {
    this.utilisateursService.findAll()
      .subscribe(utilisateurs => {
        this.listUtilisateurs = utilisateurs;
        this.dataUtilisateurList.data = utilisateurs;
      });
  }
}
