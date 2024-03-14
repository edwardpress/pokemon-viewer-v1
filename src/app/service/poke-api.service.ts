import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, switchMap } from 'rxjs';
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

  
}
