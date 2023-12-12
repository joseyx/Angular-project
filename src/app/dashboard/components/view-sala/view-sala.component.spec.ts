import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalaComponent } from './view-sala.component';

describe('ViewSalaComponent', () => {
  let component: ViewSalaComponent;
  let fixture: ComponentFixture<ViewSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
