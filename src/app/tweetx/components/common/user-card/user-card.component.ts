import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { User } from '../../../../shared/models';
import { FollowService } from 'src/app/shared/services/follow.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  showMessage = false;
  @Input() userData: User[] = [];
  @Input() myData!: User;
  @Input() type: string = '';

  private followService = inject(FollowService);
  private readonly snackbarService = inject(SnackbarService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData'] && changes['userData'].currentValue) {
      setTimeout(() => {
        if (this.userData.length == 0) {
          this.showMessage = true;
        }
      }, 1000);
    }
  }

  followUser(id: string) {
    console.log(id);
    this.followService.follow(id).subscribe((res: any) => {
      console.log(res);
    });
  }
}
