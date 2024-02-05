import { Component, OnInit } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Dato } from '../../interfaces/dato'

@Component({
  selector: 'app-fauna',
  templateUrl: './fauna.page.html',
  styleUrls: ['./fauna.page.scss'],
})
export class FaunaPage implements OnInit {
  textBuscar: string;
  datos: Dato[] = [];
  datosFiltrados: Dato[] = [];
  backendURL: string = 'http://localhost:3902';
  //loading: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const consultarDatosURL = `${this.backendURL}/api/consultarDatos`;

    this.http.get<Dato[]>(consultarDatosURL)
      .subscribe((response) => {
        let dataArray = response['data'] as Dato[];
        this.datos = dataArray.filter(dato => dato.campoRequerido === 0);
        this.datosFiltrados = [...this.datos];
        console.log(this.datos);
      }, (error) => {
        console.error('Error al obtener los datos', error);
      });


  }


  buscar(event) {
    this.textBuscar = event.detail.value;
    this.aplicarFiltro();
  }
  aplicarFiltro() {
    if (this.textBuscar) {
      this.datosFiltrados = this.datos.filter(dato =>
        dato.nombreCientifico.toLowerCase().includes(this.textBuscar.toLowerCase()) ||
        dato.nombreColoquial.toLowerCase().includes(this.textBuscar.toLowerCase()) ||
        dato.autor.toLowerCase().includes(this.textBuscar.toLowerCase())
      );
    } else {
      this.datosFiltrados = [...this.datos];
    }
  }
  getImagePath(imageName: string): string {
    return `${this.backendURL}/imagenes/fauna/${imageName}`;
  }

  eliminar(id: number) {
    const confirmacion = window.confirm(`¿Seguro que quieres eliminar? Esto lo borrará definitivamente.`);

    if (confirmacion) {
      const eliminarDatoURL = `${this.backendURL}/api/${id}`;

      this.http.delete(eliminarDatoURL)
        .subscribe(
          (response) => {
            alert('Dato eliminado exitosamente');
          },
          (error) => {
            console.error('Error al eliminar el dato', error);
          }
        );
    }
  }
}
