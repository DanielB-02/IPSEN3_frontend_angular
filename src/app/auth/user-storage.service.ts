import { Injectable } from '@angular/core';
import {JwtPayload} from "../model/jwt/jwt.model";
import {jwtDecode} from "jwt-decode";

const TOKEN = 'l_token';
const USER = 'l_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static hasToken(): boolean {
    if ( this.getToken() === null){
      return false;
    }
    return true;
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  // public saveUser(user): void {
  //   window.localStorage.removeItem(USER);
  //   window.localStorage.setItem(USER, JSON.stringify(user));
  // }
  //
  // static getUser(): any {
  //   return JSON.parse(localStorage.getItem(USER));
  // }
  //
  //
  // static getUserId(): string {
  //   const user = this.getUser();
  //   if ( user == null){ return ''; }
  //   return user.userId;
  // }
  //
  // static getUserRole(): string {
  //   const user = this.getUser();
  //   if ( user == null){ return ''; }
  //   return user.role;
  // }

  // static isAdminLoggedIn(): boolean {
  //   if ( this.getToken() === null){
  //     return false;
  //   }
  //   const role: string = this.getUserRole();
  //   return role == 'ADMIN';
  // }

  static isCustomerLoggedIn(): boolean {
    if ( this.getToken() === null){
      return false;
    }
    return true;
  }

  public signOut() {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
  public isAdmin(): boolean {
    const tokenJWT = localStorage.getItem(TOKEN);
    if (tokenJWT) {
      try {
        const decodedJWT: JwtPayload = jwtDecode(tokenJWT);
        return decodedJWT.role.some(role => role.authority === 'ADMIN');
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
    return false;
  }
  public isReadonly(): boolean {
    const tokenJWT = localStorage.getItem(TOKEN);
    if (tokenJWT) {
      try {
        const decodedJWT: JwtPayload = jwtDecode(tokenJWT);
        return decodedJWT.role.some(role => role.authority === 'READONLY');
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
    return false;
  }
  public isReadonlyOrFicter(): boolean {
    const tokenJWT = localStorage.getItem(TOKEN);
    if (tokenJWT) {
      try {
        const decodedJWT: JwtPayload = jwtDecode(tokenJWT);
        return decodedJWT.role.some(role => role.authority === 'READONLY' || role.authority === 'FICTER');
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
    return false;
  }
}
