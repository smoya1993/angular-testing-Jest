import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from '../../../app/basic/counter/counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have be matching with snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  test('increaseBy debe de incrementar basado en el argumento (5)', () => {
    component.increaseBy(5);
    expect( component.counter ).toBe(15)
  });

  test('hacer click en los botones debe de incrementar y decrementar en 1', () => {
    const buttons = compiled.querySelectorAll('button');
    buttons[0].click();
    expect( component.counter ).toBe(11);
    buttons[1].click();
    buttons[1].click();
    expect( component.counter ).toBe(9);
  });


  test('cambiar el counter debe de actualizar la etiqueta h1', () => {
    component.increaseBy(10);
    fixture.detectChanges();
    const h1 = compiled.querySelector('h1');
    expect( h1?.textContent ).toContain('20');
  })

});
