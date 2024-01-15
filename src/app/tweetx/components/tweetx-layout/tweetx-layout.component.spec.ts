import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetxLayoutComponent } from './tweetx-layout.component';

describe('TweetxLayoutComponent', () => {
  let component: TweetxLayoutComponent;
  let fixture: ComponentFixture<TweetxLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TweetxLayoutComponent]
    });
    fixture = TestBed.createComponent(TweetxLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
