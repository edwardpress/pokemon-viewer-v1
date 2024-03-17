import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { environment } from '../environment/environment.dev';

@Injectable({
  providedIn: 'root',
})

export class PokeApiService {
  constructor(private http: HttpClient) {}

  getPokemonByGen(limit:number, offset:number): Observable<any> {
      return this.http.get(`${environment.pokeApi}?limit=${limit}&offset=${offset}`).pipe(switchMap((api:any) =>{
      
        const apiUrlsArray = api.results.map((pokemon:any)=>{
          return this.http.get(pokemon.url)
        })
        return forkJoin(apiUrlsArray)
      }))
  }

  getPokemonFlavorText(id:number){
    return this.http.get(`${environment.pokeSpecies}/${id}`).pipe(map((species:any) => species.flavor_text_entries.find((text:any)=>text.language.name === 'en').flavor_text))
    
  }

  
}
