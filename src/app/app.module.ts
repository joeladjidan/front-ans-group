import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './services/interceptor/http-interceptor.service';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GestionUtilisateurComponent } from './pages/gestion-utilisateur/gestion-utilisateur.component';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    GestionUtilisateurComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes , { useHash: true, relativeLinkResolution: 'legacy' }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FormsModule,
    ReactiveFormsModule,
    FixedPluginModule,
    MatListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
