import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManueComponent } from './admin-manue.component';

describe('AdminManueComponent', () => {
  let component: AdminManueComponent;
  let fixture: ComponentFixture<AdminManueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
