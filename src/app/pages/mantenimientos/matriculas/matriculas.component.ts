import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EstudianteForm } from 'src/app/shared/formsModels/estudiantesForms';
import { EstudiantesService } from 'src/app/shared/services/estudiantes.service';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { CursosComponent } from './cursos/cursos.component';
import { CursoEstudiante } from 'src/app/shared/models/cursoEstudiante';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.scss']
})
export class MatriculasComponent {
  Estudiantes: CursoEstudiante [] = [];

  constructor(
    public estudianteForm: EstudianteForm,
    public dialog: MatDialog,
    private srvEstudiantes: EstudiantesService,
    private srvCursos: CursosService,
    private mensajeria: ToastrService
  ) {}
  
  abrirEstudiante(): void {
    let dialogOpen;
    dialogOpen = this.dialog.open(EstudiantesComponent, {
      width: 'auto',
      height: 'auto',
    });
  }



  abrirCursos(): void {
    let dialogOpen;
    dialogOpen = this.dialog.open(CursosComponent, {
      width: '470px',
      height: '525px',
    });
  }
}
