import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherSonComponent } from '../../../app/basic/father-son/father-son.component';

describe('FatherSonComponent', () => {
  let component: FatherSonComponent;
  let fixture: ComponentFixture<FatherSonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatherSonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FatherSonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have to match snapshot', () => {
    expect(compiled.innerHTML).toMatchSnapshot();    
  });

  it('should not show any botons if client is empty/null', () => {
    const buttons = compiled.querySelectorAll('button');
    expect( buttons.length ).toBe(0);
  });

  it('should show 2 botons if client is OK', () => { 
    component.client = { id: 1, name: 'Juan' };
    fixture.detectChanges();

    const buttons = compiled.querySelectorAll('button');
    expect( buttons.length ).toBe(2);
  });

  it('should have to match snapshot if client is OK', () => { 
    component.client = { id: 1, name: 'Juan' };
    fixture.detectChanges();
    expect( compiled ).toMatchSnapshot();
  });

  test('should have to emit onDeleteClient with delete buttom', () => {

    component.client = { id: 1, name: 'Juan' };
    fixture.detectChanges();

    jest.spyOn( component.onDeleteClient, 'emit' );
    
    const btnDelete = compiled.querySelector('[data-test=btn-delete]');
    btnDelete?.dispatchEvent( new Event('click') );

    expect( component.onDeleteClient.emit ).toHaveBeenCalled();
    
  });

  test('should have to emit onClientUpdated with Cambiar ID buttom', () => {
    component.client = { id: 1, name: 'Juan' };
    fixture.detectChanges();
    jest.spyOn( component.onClientUpdated, 'emit' );
    const btnChangeId = compiled.querySelector('[data-test=btn-id]');
    btnChangeId?.dispatchEvent( new Event('click') );
    expect( component.onClientUpdated.emit ).toHaveBeenCalledWith({
      id: 5,
      name: 'Juan'
    }); 
  });

  test('should have to emit onChangeClient with specific ID if client is OK', () => {

    jest.spyOn( component.onClientUpdated, 'emit' );
    component.onChange(10);
    expect( component.onClientUpdated.emit ).not.toHaveBeenCalled();

    component.client = { id: 1, name: 'Juan' };
    fixture.detectChanges();
    component.onChange(10);

    expect( component.onClientUpdated.emit ).toHaveBeenCalledWith({
      id: 10,
      name: 'Juan'
    });

  });

});
