import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalulatorComponent } from './calulator.component';
import { FormsModule } from '@angular/forms';

describe('CalulatorComponent', () => {
  let component: CalulatorComponent;
  let fixture: ComponentFixture<CalulatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalulatorComponent],
      imports:[FormsModule]
    });
    fixture = TestBed.createComponent(CalulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

describe('add method', () => {
  it('should return 0 for an empty string', () => {
    expect(component.add('')).toBe(0);
  });
  
  it('should return the sum of numbers separated by commas', () => {
    expect(component.add('1,2,3')).toBe(6);
  });

})

});
