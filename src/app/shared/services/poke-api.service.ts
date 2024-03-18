import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CachedResultService } from '@services/cached-result.service';
import { getLimitAndOffsetByGen } from '@utils/constant';
import { Observable, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environment/environment.dev';

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
    return this.http
      .get(this.getApiUrl(gen))
      .pipe(
        switchMap(api => this.processApiResponse(api)),
        tap(data => this.cachedService.setData(gen, data))
      );
  }

  getApiUrl(gen: string): string {
    const { limit, offset } = getLimitAndOffsetByGen(gen);
    return `${environment.pokeApi}?limit=${limit}&offset=${offset}`;
  }
  
 processApiResponse(api: any): Observable<any> {
    const apiUrlsArray = api.results.map((pokemon: any) => {
      return this.http.get(pokemon.url);
    });
    return forkJoin(apiUrlsArray);
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
