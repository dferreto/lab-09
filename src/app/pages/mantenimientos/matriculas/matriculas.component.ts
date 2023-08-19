import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Estudiantes } from 'src/app/shared/models/estudiante';
import { AdminMatriculasComponent } from './admin-matriculas/admin-matriculas.component';
import { EstudiantesService } from 'src/app/shared/services/estudiantes.service';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.scss']
})
export class MatriculasComponent {
  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'apellido1',
    'apellido2',
    'fechaNac',
    'acciones',

  ];

  dataSource = new MatTableDataSource();

  constructor(
    private srvEstudiantes: EstudiantesService,
    private mensajeria: ToastrService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.cargarlista()
  }

  cargarlista(){
    this.srvEstudiantes.getAll().subscribe(
      (datos) => {
        this.dataSource.data = datos;
      },
      (error) => {
        this.mensajeria.error(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirDialog(estudiante?: Estudiantes): void {
    if (estudiante) {
      this.dialog.open(AdminMatriculasComponent, {
        width: '700px',
        height: '700px',
        data: { estudiante },
      });
    } else {
      this.dialog.open(AdminMatriculasComponent, {
        width: '700px',
        height: '700px',
      });
    }
  }

  



  detalle(dato: Estudiantes): void {
   this.mensajeria.success(dato.nombre);
  }



 
    

  

}
