import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarMascotaComponent } from './agregar-mascota/agregar-mascota.component';
import { ListaMascotasAdoptablesComponent } from './lista-mascotas-adoptables/lista-mascotas-adoptables.component';
import { ListaSolicitudesComponent } from './lista-solicitudes/lista-solicitudes.component';
import { GestionSolicitudesComponent } from './gestion-solicitudes/gestion-solicitudes.component';
import { ListaMascotasAdoptadasComponent } from './lista-mascotas-adoptadas/lista-mascotas-adoptadas.component';
import { GestionMascotasComponent } from './gestion-mascotas/gestion-mascotas.component';

const routes: Routes = [
  { path: 'mascotas', component: ListaMascotasAdoptablesComponent },
  { path: 'mascotas-adoptadas', component: ListaMascotasAdoptadasComponent },
  { path: 'agregar-mascota', component: AgregarMascotaComponent },
  { path: 'lista-solicitudes', component: ListaSolicitudesComponent },
  { path: 'gestion-mascotas', component: GestionMascotasComponent},
  { path: 'gestion-solicitudes', component: GestionSolicitudesComponent },
  { path: '**', redirectTo: 'mascotas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
