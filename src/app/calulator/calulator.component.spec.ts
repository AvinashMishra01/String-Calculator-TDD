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

  it('should return the sum of numbers separated by new lines', () => {
    expect(component.add('1\n2\n3')).toBe(6);
  });

  it('should handle numbers separated by both commas and new lines', () => {
    expect(component.add('1,2\n3')).toBe(6);
  });


  it('should handle custom delimiters', () => {
    expect(component.add('//;\n1;2;3')).toBe(6);
  });

  it('should throw an error for negative numbers', () => {
    expect(() => component.add('//;\n-1;2;-3')).toThrow(new Error('Negative numbers not allowed: -1, -3'));
  });

  it('should handle multiple negative numbers', () => {
    expect(() => component.add('//;\n1;-2;3;-4')).toThrow(new Error('Negative numbers not allowed: -2, -4'));
  });

  it('should handle delimiters with special characters', () => {
    expect(component.add('//***\n1***2***3')).toBe(6);
  });

  
})

});
