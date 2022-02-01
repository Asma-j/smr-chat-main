import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { UserCreateDto, UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';
import { Router } from '@angular/router';

export const AccessTokenLocalStorage = 'access_token';

@Injectable({ providedIn: 'root' })
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string = '/';
  isLogged() {
    return false;
  }

  private currentAccessTokenSubject: BehaviorSubject<string>;

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    // private userStore: Store<fromUser.State>
  ) {
    this.currentAccessTokenSubject = new BehaviorSubject<string>(localStorage.getItem(AccessTokenLocalStorage));
  }

  public get currentAccessToken(): string {
    return this.currentAccessTokenSubject.value;
  }

  /* local login */
  login(email: string, password: string) {
    return this.http.post<UserUpdateDto>('api/auth/login', {email, password }).pipe(
      map(res  => {
        // login successful if there's a jwt token in the response
        const tt :any = res;
        if (tt && tt.access_token) {
          this.successLogin(tt.access_token);
          return tt.access_token;
        } else {
          return null;
        }
      }),
      catchError((error) => this.handleError(error))
    );
  }

  /* Register */
  register(user: UserCreateDto): Observable<any> {
    return this.http.post<UserCreateDto>('api/user', user).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  successLogin(access_token: string) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem(AccessTokenLocalStorage, access_token);
    this.currentAccessTokenSubject.next(access_token);
  }

  logout(url?: string) {
    // remove user from local storage to log user out
    //console.log('Log out call (optional url:)',url);
    localStorage.removeItem(AccessTokenLocalStorage);
    this.currentAccessTokenSubject.next(null);
    if(url) {
      this.router.navigate(['/public/login'], { queryParams: { returnUrl: url } });
    }else{
      this.router.navigate(['/public/login']);
    }

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
