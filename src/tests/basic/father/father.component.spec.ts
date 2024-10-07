import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherComponent } from '../../../app/basic/father/father.component';
import { FatherSonComponent } from '../../../app/basic/father-son/father-son.component';
import { By } from '@angular/platform-browser';

describe('FatherComponent', () => {
  let component: FatherComponent;
  let fixture: ComponentFixture<FatherComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatherComponent, FatherSonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have to match snapshot', () => {
    expect(compiled).toMatchSnapshot();    
  });

  it('shoud establish the client with the indicated name', () => {

    component.onSetClient('Pedro');
    fixture.detectChanges();

    const codeDiv = compiled.querySelector('.mt-2');
    
    expect( codeDiv?.textContent ).toContain('"name"');
    expect( codeDiv?.textContent ).toContain('"Pedro"');
  });

  test('should delete the client if it onDeleteClient (son) is called', () =>{

    component.client = { id: 1, name: 'Eduardo' };
    fixture.detectChanges();

    //Control absoluto sobre el componente hijo con fixture.debugElement.query
    // Con By.directive buscas para la directiva del componente hijo en html
    const sonDebugElement = fixture.debugElement.query( By.directive(FatherSonComponent) );
    const sonComponent:FatherSonComponent = sonDebugElement.componentInstance;
    //console.log(sonComponent.client);
    sonComponent.onDeleteClient.emit();
    expect( component.client ).toBe(undefined);

  });

  it('should update the client onClientUpdated', () => {
    component.client = { id: 1, name: 'Eduardo' };
    fixture.detectChanges();

    const sonDebugElement = fixture.debugElement.query( By.directive(FatherSonComponent) );
    const sonComponent:FatherSonComponent = sonDebugElement.componentInstance;
    // console.log(sonComponent.client);
    sonComponent.onClientUpdated.emit({ id: 10, name: 'Pedro' });
    expect( component.client ).toEqual({ id: 10, name: 'Pedro' }); 
    //Para evaluar objectos mejor usar el toEqual
  })

});
