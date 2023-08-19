import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CursosForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      idCurso: ['', [Validators.required]],
      nombreCurso: ['', [Validators.required]],
      estado: [true],
    });
  }
}
