import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegisterBoxComponent } from './dialog-register-box.component';

describe('DialogRegisterBoxComponent', () => {
  let component: DialogRegisterBoxComponent;
  let fixture: ComponentFixture<DialogRegisterBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRegisterBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRegisterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
