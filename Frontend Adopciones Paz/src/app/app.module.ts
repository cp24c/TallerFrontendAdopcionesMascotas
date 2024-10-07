import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AgregarMascotaComponent } from './agregar-mascota/agregar-mascota.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ListaMascotasAdoptablesComponent } from './lista-mascotas-adoptables/lista-mascotas-adoptables.component';
import { ListaSolicitudesComponent } from './lista-solicitudes/lista-solicitudes.component';
import { GestionSolicitudesComponent } from './gestion-solicitudes/gestion-solicitudes.component';
import { ListaMascotasAdoptadasComponent } from './lista-mascotas-adoptadas/lista-mascotas-adoptadas.component';
import { GestionMascotasComponent } from './gestion-mascotas/gestion-mascotas.component';
@NgModule({
  declarations: [
    AppComponent,
    AgregarMascotaComponent,
    NavbarComponent,
    ListaMascotasAdoptablesComponent,
    ListaSolicitudesComponent,
    GestionSolicitudesComponent,
    ListaMascotasAdoptadasComponent,
    GestionMascotasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
