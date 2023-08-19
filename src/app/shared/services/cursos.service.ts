import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Cursos } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cursos[]> {
    return this.http
      .get<Cursos[]>('http://localhost:3000/cursos')
      .pipe(catchError(this.handlerError));
  }

  getById(idCurso: number): Observable<Cursos[]> {
    return this.http
    .get<Cursos[]>('http://localhost:3000/cursos/' + idCurso)
      .pipe(catchError(this.handlerError));
  }
  
  guardar(curso: Cursos): Observable<Cursos> {
    return this.http
      .post<Cursos>('http://localhost:3000/cursos', curso)
      .pipe(catchError(this.handlerError));
  }
  modificar(curso: Cursos): Observable<Cursos> {
    return this.http
      .patch<Cursos>('http://localhost:3000/cursos', curso)
      .pipe(catchError(this.handlerError));
  }

  eliminar(idCurso: number): Observable<Cursos> {
    return this.http
      .delete<Cursos>('http://localhost:3000/cursos/' + idCurso)
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
