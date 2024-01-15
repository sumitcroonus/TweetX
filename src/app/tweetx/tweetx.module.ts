import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TweetxRoutingModule } from './tweetx-routing.module';
import { FeedComponent } from './components/feed/feed.component';
import { TweetxLayoutComponent } from './components/tweetx-layout/tweetx-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { WriteTweetComponent } from './components/common/write-tweet/write-tweet.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostCardComponent } from './components/common/post-card/post-card.component';
import { UserCardComponent } from './components/common/user-card/user-card.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard, AuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [
    FeedComponent,
    TweetxLayoutComponent,
    HeaderComponent,
    WriteTweetComponent,
    PostCardComponent,
    UserCardComponent,
    UsersComponent,
    ProfileComponent
  ],
  imports: [CommonModule, TweetxRoutingModule, ReactiveFormsModule, ],
  providers: [AuthGuard],
})
export class TweetxModule {}
