import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedChatComponent } from './selected-chat.component';

describe('SelectedChatComponent', () => {
  let component: SelectedChatComponent;
  let fixture: ComponentFixture<SelectedChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
