import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../model/user/user.model";
import { environment } from "../environments/environment";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class UserService {
  private userUrl: string = environment['BASIC_URL'] + 'user';
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable(); // Expose the list as an observable

  constructor(private http: HttpClient) {}

  // Load all users and push them into the BehaviorSubject
  public findAll(): void {
    this.http.get<User[]>(this.userUrl).subscribe(
      users => this.usersSubject.next(users),
      error => console.error(error)
    );
  }

  // Delete user and update the BehaviorSubject
  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.userUrl}/${id}`).pipe(
      map(() => {
        const updatedUsers = this.usersSubject.value.filter(user => user.id !== id);
        this.usersSubject.next(updatedUsers);
      })
    );
  }
}
