import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { MantenimientosComponent } from './mantenimientos.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CursosComponent } from './matriculas/cursos/cursos.component';
import { EstudiantesComponent } from './matriculas/estudiantes/estudiantes.component';
import { MatriculasComponent } from './matriculas/matriculas.component';


@NgModule({
  declarations: [
    MantenimientosComponent,
    MatriculasComponent,
    CursosComponent,
    EstudiantesComponent

  ],
  imports: [
    CommonModule,
    MantenimientosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MantenimientosModule { }
