import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../servicios/api.service'; // Asegúrate de que el servicio esté configurado
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-mascotas',
  templateUrl: './gestion-mascotas.component.html',
  styleUrls: ['./gestion-mascotas.component.css']
})
export class GestionMascotasComponent implements OnInit {
  mascotas: any[] = [];
  mascotaSeleccionada: any = {};

  constructor(private apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargarMascotas();
  }

  cargarMascotas() {
    this.apiService.getMascotas().subscribe({
      next: (data) => this.mascotas = data,
      error: (error) => console.error('Error al cargar mascotas', error)
    });
  }

  editarMascota(mascota: any, modal: TemplateRef<any>) {
    this.mascotaSeleccionada = { ...mascota }; // Crear una copia de la mascota seleccionada
    this.modalService.open(modal, { centered: true });
  }

  guardarCambiosMascota(modal: any) {
    this.apiService.actualizarMascota(this.mascotaSeleccionada).subscribe({
      next: () => {
        Swal.fire('Mascota actualizada', 'Los cambios han sido guardados', 'success');
        this.cargarMascotas();
        modal.dismiss();
      },
      error: (error) => Swal.fire('Error', 'Ocurrió un error al actualizar la mascota', 'error')
    });
  }

  eliminarMascota(idMascota: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no puede deshacerse, tambíen se eliminarán todas las solicitudes asociadas a esta mascota.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-danger', // Clases de Bootstrap para el botón de éxito
        cancelButton: 'btn btn-secondary'  // Opcional: clases para el botón de cancelación
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.eliminarMascota(idMascota).subscribe({
          next: () => {
            Swal.fire('Eliminada', 'La mascota ha sido eliminada', 'success');
            this.cargarMascotas(); // Recargar la lista de mascotas
          },
          error: (error) => Swal.fire('Error', 'Ocurrió un error al eliminar la mascota', 'error')
        });
      }
    });
  }
}
