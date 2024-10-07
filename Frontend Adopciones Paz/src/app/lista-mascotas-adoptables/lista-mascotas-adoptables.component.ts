import { Component } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-mascotas-adoptables',
  templateUrl: './lista-mascotas-adoptables.component.html',
  styleUrls: ['./lista-mascotas-adoptables.component.css']
})
export class ListaMascotasAdoptablesComponent {
  mascotas: any[] = [];
  selectedMascotaId: any | null = null;

  // variables para el formulario de adopción
  identificacion: string = '';
  celular: string = '';
  correo: string = '';

  constructor(private apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.apiService.getMascotasDisponibles().subscribe({
      next: (data: any[]) => {
        this.mascotas = data;
      },
      error: (error) => {
        console.error(`Error al obtener mascotas`, error)
      }
    });
  }

  abrirModal(modalContent: TemplateRef<any>, mascotaId: any) {
    this.selectedMascotaId = mascotaId; 
    this.modalService.open(modalContent, { centered: true });
  }

  obtenerImagenMascota(nombreImagen: string): string {
    return this.apiService.getImagenMascota(nombreImagen);
  }

  formularioAdopcion() {
    // Creación del diccionario para la solicitud
    const solicitud = {
      identidadSolicitante: this.identificacion,
      celSolicitante: this.celular,
      correoSolicitante: this.correo,
      idMascota: this.selectedMascotaId
    };

    this.apiService.crearSolicitud(solicitud).subscribe({
      next: (response) => {
        Swal.fire('Éxito', 'Tu solicitud ha sido enviada con éxito.', 'success');
        this.modalService.dismissAll();
        this.limpiarFormulario(); // Limpia el formulario después de enviar
      },
      error: (error) => {
        Swal.fire('Error', 'Ocurrió un error al enviar la solicitud.', 'error');
      }
    });
  }

  limpiarFormulario() {
    this.identificacion = '';
    this.celular = '';
    this.correo = '';
  }

  validarNumeros(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  validarPegado(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedData = clipboardData.getData('text');

    if (!/^[0-9]+$/.test(pastedData)) {
      event.preventDefault();
    }
  }
}
