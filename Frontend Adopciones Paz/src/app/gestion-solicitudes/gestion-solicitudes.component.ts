import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-solicitudes',
  templateUrl: './gestion-solicitudes.component.html',
  styleUrls: ['./gestion-solicitudes.component.css']
})
export class GestionSolicitudesComponent implements OnInit {
  solicitudes: any[] = [];
  solicitudSeleccionada: any = null;

  constructor(private apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  // Carga todas las solicitudes desde el backend
  cargarSolicitudes() {
    this.apiService.getSolicitudes().subscribe({
      next: (data: any[]) => {
        this.solicitudes = data;
      },
      error: (error) => {
        console.error('Error al obtener las solicitudes:', error);
      }
    });
  }

  // Abrir modal para editar una solicitud
  editarSolicitud(solicitud: any, modalEdit: TemplateRef<any>) {
    this.solicitudSeleccionada = { ...solicitud }; // Crear una copia para editar
    this.modalService.open(modalEdit);
  }

  // Guardar los cambios después de la edición
  guardarCambios(modal: any) {
    if (!this.solicitudSeleccionada.identidadSolicitante ||
      !this.solicitudSeleccionada.celSolicitante ||
      !this.solicitudSeleccionada.correoSolicitante ||
      !this.solicitudSeleccionada.estado) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    this.apiService.actualizarSolicitud(this.solicitudSeleccionada).subscribe({
      next: (response) => {
        Swal.fire('Solicitud actualizada', 'Los cambios han sido guardados correctamente.', 'success');
        modal.dismiss();
        this.cargarSolicitudes(); // Refrescar la tabla de manera reactiva
      },
      error: (error) => {
        Swal.fire('Error', error.error.error, 'error');
      }
    });
  }

  validarNumeros(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    // Solo permitir números (charCode 48-57 corresponde a 0-9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  // Función para validar que solo se permitan números en el pegado
  validarPegado(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedData = clipboardData.getData('text');

    // Verificar si el contenido pegado contiene caracteres no numéricos
    if (!/^[0-9]+$/.test(pastedData)) {
      event.preventDefault(); // Bloquear el pegado si no son solo números
    }
  }

  // Aceptar una solicitud
  aceptarSolicitud(solicitud: any) {
    solicitud.estado = 'Aceptada';
    this.apiService.actualizarSolicitud(solicitud).subscribe({
      next: (response) => {
        Swal.fire('Solicitud Aceptada', 'La solicitud ha sido aceptada.', 'success');
        this.cargarSolicitudes();
      },
      error: (error) => {
        if (error.status === 400 && error.error.error === 'Ya existe una solicitud aceptada para esta mascota.') {
          Swal.fire('Error', 'Ya existe una solicitud aceptada para esta mascota. No puedes aceptar otra.', 'error');
          this.cargarSolicitudes();
        } else {
          Swal.fire('Error', 'Ocurrió un error al aceptar la solicitud.', 'error');
        }
      }
    });
  }


  // Rechazar una solicitud
  rechazarSolicitud(solicitud: any) {
    solicitud.estado = 'Rechazada';
    this.apiService.actualizarSolicitud(solicitud).subscribe({
      next: (response) => {
        Swal.fire('Solicitud Rechazada', 'La solicitud ha sido rechazada.', 'success');
        this.cargarSolicitudes();
      },
      error: (error) => {
        Swal.fire('Error', 'Ocurrió un error al rechazar la solicitud.', 'error');
        console.error('Error al rechazar la solicitud:', error);
      }
    });
  }
}
