import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MatriculasForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      idMatricula: ['', [Validators.required]],
      estudiante: ['', [Validators.required]],
      fechaMatricula: [
        formatDate(Date.now(), 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      detalleMatricula:['', [Validators.required]],
    });
  }
}
