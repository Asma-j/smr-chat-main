import { Injectable } from '@angular/core';
import {  UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class UserService  {

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<UserUpdateDto>{
    const url = `${'api/currentUser'}`;
    return this.http.get<UserUpdateDto>(url).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  updateCurrentUser(user: UserUpdateDto) : Observable<any>{
    return this.http.put<UserUpdateDto>('api/currentUser', user).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
