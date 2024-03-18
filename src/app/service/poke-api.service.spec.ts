import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { dummyData } from '../test/dummyPokemonData';
import { dummyPokemonSpeciesData } from '../test/dummyPokemonSpeciesData';
import { CachedResultService } from './cached-result.service';
import { PokeApiService } from './poke-api.service';

describe('PokeApiService', () => {
  let service: PokeApiService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    const cachedServiceSpy = jasmine.createSpyObj('CachedResultService', ['getData','setData']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeApiService, 
        { provide: CachedResultService, useValue: cachedServiceSpy },
      ]
    });

    cachedServiceSpy.getData.withArgs("gen1").and.returnValue(dummyData);
    cachedServiceSpy.getData.withArgs("gen2").and.returnValue(false);


  });



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeApiService, 
    ]
    });
    service = TestBed.inject(PokeApiService);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(service, 'processApiResponse').and.returnValue(of(dummyData));

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Pokemon data by generation', () => {
    const gen = 'gen2';
    const expectedUrl = `https://pokeapi.co/api/v2/pokemon?limit=100&offset=151`;
    const mockResponse = dummyData

    service.getPokemonByGen(gen).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get Pokemon flavor text by ID', () => {
    const id = 1;
    const expectedUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    const mockResponse = dummyPokemonSpeciesData

    service.getPokemonFlavorText(id).subscribe((data) => {
      expect(data).toEqual(mockResponse.flavor_text_entries[0].flavor_text);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });


  it('should get Pokemon data from cache instead of calling getPokemonByGen API', () => {
    const gen = 'gen1';
    const pokemonGenSpy = spyOn(service, 'getPokemonByGen').and.callThrough();

    service.getPokemonData(gen).subscribe((data: any) => {
      expect(pokemonGenSpy).not.toHaveBeenCalled();
    });
  })

  it('should call getPokemonByGen API if it is not in cache', () => {
    const gen = 'gen2';
    const pokemonGenSpy = spyOn(service, 'getPokemonByGen').and.callThrough();
    const expectedUrl = `https://pokeapi.co/api/v2/pokemon?limit=100&offset=151`;
    const mockResponse = { flavor_text_entries: [{ flavor_text: 'Some flavor text' }] };

    service.getPokemonData(gen).subscribe((data: any) => {
      expect(pokemonGenSpy).toHaveBeenCalled();
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

  })
})
