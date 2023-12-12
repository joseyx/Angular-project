import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalaComponent } from './update-sala.component';

describe('UpdateSalaComponent', () => {
  let component: UpdateSalaComponent;
  let fixture: ComponentFixture<UpdateSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
