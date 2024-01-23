import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user/user.model";
import {environment} from "../environments/environment";
import {Role} from "../model/role/role";
import {Observable} from "rxjs";
import {Platform} from "../model/platform/platform";
import {RoleForm} from "../model/api/role-form/role-form";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleUrl: string = environment['BASIC_URL'] + 'role';

  constructor(private http: HttpClient) { }

  public readAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.roleUrl);
  }

  public create(role: RoleForm): Observable<RoleForm> {
    return this.http.post<RoleForm>(this.roleUrl,
      {
        "name": role.name,
        "permissions": role.permissions
      });
  }

  public update(role: RoleForm, id: String): Observable<RoleForm> {
    return this.http.put<RoleForm>(`${this.roleUrl}/${id}`,
      {
        "name": role.name,
        "permissions": role.permissions
    })
  }
}
