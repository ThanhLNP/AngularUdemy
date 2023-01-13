import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../shared/model/user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_KEY = 'AIzaSyDQn8wrn1-BbJgH24_geg0RfIpYIiVpZbA';
  private tokenExpirationTimer: any;

  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogIn(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '');

    if (!userData) return;

    const expirationDate = new Date(userData._tokenExpirationDate);
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      expirationDate
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogOut(expirationDate.getTime() - new Date().getTime());
    }
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogOut(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  logOut(): void {
    this.user.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error?.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The Email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'The Email does not exists!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid!';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator!';
        break;
    }
    return throwError(errorMessage);
  }
}
