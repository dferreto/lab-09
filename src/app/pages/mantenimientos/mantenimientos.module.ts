import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { MantenimientosComponent } from './mantenimientos.component';
import { MatriculasComponent } from './matriculas/matriculas.component';
import { AdminMatriculasComponent } from './matriculas/admin-matriculas/admin-matriculas.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MantenimientosComponent,
    MatriculasComponent,
    AdminMatriculasComponent
  ],
  imports: [
    CommonModule,
    MantenimientosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MantenimientosModule { }
