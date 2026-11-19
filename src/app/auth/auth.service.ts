import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, catchError, throwError } from 'rxjs';
import {UserStorageService} from "./user-storage.service";
import {environment} from "../environments/environment";

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService
  ) { }

  login(email: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { email, password };

    return this.http.post<{ token: string }>(BASIC_URL + 'auth/signin', body, { headers, observe: 'response' }).pipe(
      map((res) => {
        const tokenResponse = res.body;
        if (tokenResponse) {
          this.userStorageService.saveToken(tokenResponse.token);
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Login Error:', error);
        return throwError(error);
      })
    );
  }

  logout() {
    this.userStorageService.signOut();
  }

  register(signupRequest: Record<string, unknown>): Observable<unknown> {
    return this.http.post(BASIC_URL + "signup", signupRequest);
  }

}

