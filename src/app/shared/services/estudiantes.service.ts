import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Estudiante } from '../models/estudiante';


@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

 
  constructor(private http: HttpClient) {}

  getAll(): Observable<Estudiante[]> {
    return this.http
      .get<Estudiante[]>('http://localhost:3000/estudiante')
      .pipe(catchError(this.handlerError));
  }

  handlerError(error: HttpErrorResponse) {
    let mensaje = 'Error desconocido, reporte al adminstrador.';

    if (error?.error) {
      mensaje = error?.error?.mensaje;
    }
    return throwError(() => new Error(mensaje));
}
}
