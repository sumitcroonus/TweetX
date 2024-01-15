import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Tweet, User } from 'src/app/shared/models';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { TweetService } from 'src/app/shared/services/tweet.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  selectedContent: string = 'posts';
  myPosts: Tweet[] = [];
  myProfileDetail!: User;
  followers: User[] = [];
  following: User[] = [];

  private readonly tweetService = inject(TweetService);
  private readonly userService = inject(UserService);
  private readonly snackbarService = inject(SnackbarService);

  ngOnInit() {
    this.getMyprofile();
    this.getMyPosts();
  }

  getMyprofile() {
    this.userService.getMyProfile().subscribe((user) => {
      this.myProfileDetail = user[0] as User;
      console.log(this.myProfileDetail);
      this.getMyFollowers(this.myProfileDetail);
      this.getMyFollowing(this.myProfileDetail);
    });
  }

  getMyFollowers(user: User) {
    this.followers = [];
    user.followers?.map((follower: string) => {
      this.userService.getUserById(follower).subscribe(
        (res) => {
          if (
            !this.followers.some(
              (existingUser) => existingUser.uid === res[0].uid
            )
          ) {
            this.followers.push(res[0] as User);
          }
        },
        (err) => {
          this.snackbarService.toggleSnackbar(err.message);
        }
      );
    });
  }

  getMyFollowing(user: User) {
    this.following = [];
    user.following?.map((following: string) => {
      this.userService.getUserById(following).subscribe(
        (res) => {
          if (
            !this.following.some(
              (existingUser) => existingUser.uid === res[0].uid
            )
          ) {
            this.following.push(res[0] as User);
          }
        },
        (err) => {
          this.snackbarService.toggleSnackbar(err.message);
        }
      );
    });
  }

  getMyPosts() {
    this.tweetService.getMyTweets().subscribe((res: Tweet[]) => {
      this.myPosts = res;
      this.myPosts.map((res: any) => {
        res.date = res.date.toDate();
      });
    });
  }

  showContent(content: string): void {
    this.selectedContent = content;
  }
}
