import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../../shared/models';
import { UserService } from 'src/app/shared/services/user.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  allUsers: User[] = [];
  myProfileDetail!: User;

  private readonly userService = inject(UserService);
  private readonly snackbarService = inject(SnackbarService);

  ngOnInit() {
    this.getAllUsers();
    this.getMyprofile();
  }

  getAllUsers() {
    this.userService.getAllUsersExceptlogedInUser().subscribe(
      (res) => {
        this.allUsers = res as User[];
      },
      (err) => {
        this.snackbarService.toggleSnackbar(err.message);
      }
    );
  }

  getMyprofile() {
    this.userService.getMyProfile().subscribe((user) => {
      this.myProfileDetail = user[0] as User;
    });
  }
}
