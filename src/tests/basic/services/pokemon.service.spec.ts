import { TestBed } from '@angular/core/testing';

import { PokemonService } from '../../../app/basic/services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it( 'should get bulbasaur´s information', (done) => {
    service.getPokemon(1)
      .subscribe( pokemon => {
        // console.log(pokemon);
        expect( pokemon.name ).toBe('bulbasaur');
        done();
      })

  });

});
