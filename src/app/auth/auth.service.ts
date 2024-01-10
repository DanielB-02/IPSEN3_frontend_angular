import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, Observable, catchError, throwError, of } from 'rxjs';
import {UserStorageService} from "./user-storage.service";
import {environment} from "../environments/environment";

const BASIC_URL = environment['BASIC_URL'];
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  session: any;

  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService
  ) { }

  login(email: string, password: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { email, password };
    // const body = { "email": email, "password": password };

    return this.http.post(BASIC_URL + 'auth/signin', body, { headers, observe: 'response' }).pipe(
      map((res) => {
        const tokenResponse = res.body;
        if (tokenResponse) {
          this.userStorageService.saveToken(tokenResponse["token"]);
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
    this.session = undefined;
    // redirect to landing page
  }

  register(signupRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + "signup", signupRequest);
  }

  // getUserById(): Observable<any> {
  //   const userId = UserStorageService.getUserId();
  //   return this.http.get<[]>(`${BASIC_URL}api/user/${userId}`, {
  //     headers: this.createAuthorizationHeader(),
  //   }).pipe(
  //     tap((_) => this.log('User Fetched successfully')),
  //     catchError(this.handleError<[]>('Error Fetching User', []))
  //   );
  // }
  //
  // updateUser(data): Observable<any> {
  //   return this.http.post<[]>(`${BASIC_URL}api/update`, data, {
  //     headers: this.createAuthorizationHeader(),
  //   }).pipe(
  //     tap((_) => this.log('User Updated successfully')),
  //     catchError(this.handleError<[]>('Error Updating User', []))
  //   );
  // }

  // updatePassword(changePasswordDto: any): Observable<any> {
  //   changePasswordDto.id = UserStorageService.getUserId();
  //   return this.http.post<[]>(`${BASIC_URL}api/updatePassword`, changePasswordDto, {
  //     headers: this.createAuthorizationHeader(),
  //   }).pipe(
  //     tap((_) => this.log('Password Updated successfully')),
  //     catchError(this.handleError<[]>('Error Updating Password', []))
  //   );
  // }

  // Track Order

  getOrderByTrackingId(trackingId: number): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}order/${trackingId}`)
      .pipe(
        tap((_) => this.log('Order fetched successfully')),
        catchError(this.handleError<[]>('Error getting Order', []))
      );
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  private log(message: string): void {
    console.log(`User Auth Service: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

