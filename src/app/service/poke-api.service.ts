import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../environment/environment.dev';
import { CachedResultService } from './cached-result.service';
import { getLimitAndOffsetByGen } from '../shared/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  constructor(
    private http: HttpClient,
    private cachedService: CachedResultService
  ) {}

  getPokemonData(gen: string) {
    return this.cachedService.getData(gen)
      ? of(this.cachedService.getData(gen))
      : this.getPokemonByGen(gen);
  }

  getPokemonByGen(gen: string): Observable<any> {
    const { limit, offset } = getLimitAndOffsetByGen(gen);

    return this.http
      .get(`${environment.pokeApi}?limit=${limit}&offset=${offset}`)
      .pipe(
        switchMap((api: any) => {
          const apiUrlsArray = api.results.map((pokemon: any) => {
            return this.http.get(pokemon.url);
          });
          return forkJoin(apiUrlsArray).pipe(
            tap((data) => {
              this.cachedService.setData(gen, data);
            })
          );
        })
      );
  }

  getPokemonFlavorText(id: number) {
    return this.http
      .get(`${environment.pokeSpecies}/${id}`)
      .pipe(
        map(
          (species: any) =>
            species.flavor_text_entries.find(
              (text: any) => text.language.name === 'en'
            ).flavor_text
        )
      );
  }
}
