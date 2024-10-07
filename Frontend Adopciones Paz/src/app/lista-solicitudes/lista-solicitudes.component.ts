import { Component } from '@angular/core';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrl: './lista-solicitudes.component.css'
})
export class ListaSolicitudesComponent {
  solicitudes: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getSolicitudes().subscribe({
      next: (data: any[]) => {
        this.solicitudes = data;
      },
      error: (error) => {
        console.error('Error al obtener las solicitudes:', error);
      }
    });
  }
}
