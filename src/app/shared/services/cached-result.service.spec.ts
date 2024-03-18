import { TestBed } from '@angular/core/testing';
import { dummyData } from '../../test/dummyPokemonData';
import { CachedResultService } from './cached-result.service';

describe('CachedResultService', () => {
  let service: CachedResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CachedResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve data from cache', () => {
    const generation = 'gen1';
    const response = dummyData

    service.setData(generation, response);
    const cachedData = service.getData(generation);

    expect(cachedData).toEqual(response);
  });

  it('should return undefined for non-existent data in cache', () => {
    const generation = 'gen2';

    const cachedData = service.getData(generation);

    expect(cachedData).toBeUndefined();
  });
});
