import { Component } from '@angular/core';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-lista-mascotas-adoptadas',
  templateUrl: './lista-mascotas-adoptadas.component.html',
  styleUrls: ['./lista-mascotas-adoptadas.component.css']
})
export class ListaMascotasAdoptadasComponent {
  mascotas: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMascotasAdoptadas().subscribe({
      next: (data: any[]) => {
        this.mascotas = data;
      },
      error: (error) => {
        console.error(`Error al obtener mascotas`, error)
      }
    });
  }

  obtenerImagenMascota(nombreImagen: string): string {
    return this.apiService.getImagenMascota(nombreImagen);
  }
}
