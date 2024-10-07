import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/adopcionespaz';

  constructor(private http: HttpClient) { }

  //Método para listar las mascotas disponibles para adoptar
  getMascotasDisponibles(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/mascotasdisponibles`);
  }

  //Método para listar las mascotas adoptadas
  getMascotasAdoptadas(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/mascotasadoptadas`);
  }

  //Método para crear una mascota
  agregarMascota(mascota: FormData) {
    return this.http.post<any>(`${this.baseUrl}/ingresarmascota`, mascota);
  }

  //Método para obtener la lista de mascotas
  getMascotas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/mascotas`);
  }

  //Método para actualizar lo datos de la mascota
  actualizarMascota(mascota: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizarmascota/${mascota.idMascota}`, mascota);
  }

  //Método para eliminar una mascota
  eliminarMascota(idMascota: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminarmascota/${idMascota}`);
  }

  // Método para obtener la URL de la imagen de la mascota
  getImagenMascota(nombreImagen: string) {
    return `${this.baseUrl}/imagenmascota/${nombreImagen}`;
  }

  // Método para obtener todas las solicitudes
  getSolicitudes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/solicitudes`);
  }

  //Método para crear la solicitud de adopción
  crearSolicitud(solicitud: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/nuevasolicitud`, solicitud);
  }

  // Método para actualizar solicitud
  actualizarSolicitud(solicitud: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizarsolicitud/${solicitud.idSolicitud}`, solicitud);
  }
}
