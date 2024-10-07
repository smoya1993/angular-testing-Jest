import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharizardComponent } from '../../../app/basic/charizard/charizard.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from '../../../app/basic/services/pokemon.service';


describe('CharizardComponent', () => {
  let component: CharizardComponent;
  let fixture: ComponentFixture<CharizardComponent>;
  let compiled: HTMLElement;
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharizardComponent ],
      imports: [ HttpClientTestingModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    service = TestBed.inject( PokemonService );
    httpMock = TestBed.inject( HttpTestingController );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have to match snapshot', () => {
    expect(compiled.innerHTML).toMatchSnapshot();    
  });

  test('should show loading', () => {
    const h2 = compiled.querySelector('h2');
    expect( h2?.textContent ).toContain('Loading...');
  });

  test('should load information immediately', () => {

    const dummyPokemon = {
      name: 'charizardo1!!',
      sprites: {
        front_default: 'https://charizard.com/sprite.png'
      }
    };

    const request = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/6');
    expect( request.request.method ).toBe('GET');
     request.flush( dummyPokemon );

    fixture.detectChanges();
     //console.log(compiled.innerHTML);
    const h3  = compiled.querySelector('h3');
    const img = compiled.querySelector('img');

    expect( h3?.textContent?.toLocaleLowerCase() ).toContain( dummyPokemon.name.toLocaleLowerCase() );
    expect( img?.src ).toBe( dummyPokemon.sprites.front_default );
    expect( img?.alt ).toBe( dummyPokemon.name );
  });
});
