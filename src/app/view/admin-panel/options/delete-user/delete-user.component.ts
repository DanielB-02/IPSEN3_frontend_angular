// delete-user.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../model/user/user.model';
import {CommonModule} from "@angular/common";


@Component({
    selector: 'app-delete-user',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './delete-user.component.html',
    styleUrl: './delete-user.component.scss'
  })
export class DeleteUserComponent implements OnInit {
  public users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Subscribe to the observable for real-time updates
    this.userService.users$.subscribe(users => this.users = users);

    // Trigger the initial load of users
    this.userService.findAll();
  }

  public deleteProduct(user: User) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id).subscribe(
        () => {
          // The BehaviorSubject inside UserService will handle the user list update
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}
