import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class DetalleMatriculasForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      idDetalle: ['', [Validators.required]],
      curso: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
    });
  }
}
