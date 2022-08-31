import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkDetailComponentComponent } from './bookmark-detail-component.component';

describe('BookmarkDetailComponentComponent', () => {
  let component: BookmarkDetailComponentComponent;
  let fixture: ComponentFixture<BookmarkDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkDetailComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
