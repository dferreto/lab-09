import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EstudiantesService } from 'src/app/shared/services/estudiantes.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent {
  dataSource = new MatTableDataSource();

  mostrarEstudiantes: string[] = [
    'cedula',
    'nombre',
    'apellido1',
    'apellido2',
    'fechaNac',
    'seleccionar'
  ];

  constructor(
    private srvEstudiantes: EstudiantesService,
    private mensajeria: ToastrService
  ) {}

  ngOnInit() {
    this.srvEstudiantes.getAll().subscribe(
      (datos) => {
        this.dataSource.data = datos;
      },
      (errors) => {
        this.mensajeria.error(`Lo siento se produjo un error. ${errors}`);
      }
    );
  }
}
