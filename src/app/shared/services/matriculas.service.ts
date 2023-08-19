import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Matriculas } from '../models/matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculasService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Matriculas[]> {
    return this.http
      .get<Matriculas[]>('http://localhost:3000/matriculas')
      .pipe(catchError(this.handlerError));
  }

  guardar(matricula: Matriculas): Observable<Matriculas> {
    return this.http
      .post<Matriculas>('http://localhost:3000/matriculas', matricula)
      .pipe(catchError(this.handlerError));
  }

  getById(idMatricula: number): Observable<Matriculas[]> {
    return this.http
    .get<Matriculas[]>('http://localhost:3000/matriculas/' + idMatricula)
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
