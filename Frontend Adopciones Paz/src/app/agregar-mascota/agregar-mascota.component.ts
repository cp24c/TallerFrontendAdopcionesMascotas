import { Component } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.css'],
})
export class AgregarMascotaComponent {
  nuevaMascota = {
    nombre: '',
    edad: null as number | null, // Asegúrate de que edad pueda ser null o number
    especie: '',
    raza: '',
    sexo: '',
    contacto: '',
  };

  imagenSeleccionada: File | null = null;
  formSubmitted = false;

  constructor(private apiService: ApiService, private router: Router) { }

  // Método para manejar la selección de imagen
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;
    }
  }
  agregarMascota() {
    this.formSubmitted = true;

    if (!this.imagenSeleccionada) {
        Swal.fire('Error', 'Debes seleccionar una imagen.', 'error');
        return;
    }

    const formData = new FormData(); // Para enviar tanto los datos como la imagen
    formData.append('nombre', this.nuevaMascota.nombre);
    formData.append('edad', this.nuevaMascota.edad?.toString() || ''); // Verifica que no sea null
    formData.append('especie', this.nuevaMascota.especie);
    formData.append('raza', this.nuevaMascota.raza);
    formData.append('sexo', this.nuevaMascota.sexo);
    formData.append('contacto', this.nuevaMascota.contacto);

    formData.append('imagen', this.imagenSeleccionada, this.imagenSeleccionada.name); // Adjuntar la imagen

    this.apiService.agregarMascota(formData).subscribe({
        next: (response) => {
            Swal.fire('Mascota Agregada', 'La mascota ha sido agregada con éxito', 'success');
            // Reiniciar el formulario
            this.nuevaMascota = {
                nombre: '',
                edad: null, // Restablecer la edad como null
                especie: '',
                raza: '',
                sexo: '',
                contacto: '',
            };
            this.imagenSeleccionada = null; // Resetear la imagen seleccionada
            this.router.navigate(['/'], { replaceUrl: true });
        },
        error: (error) => {
            Swal.fire('Error', 'Ocurrió un error al agregar la mascota', 'error');
            console.error('Error al agregar mascota:', error);
        }
    });
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
