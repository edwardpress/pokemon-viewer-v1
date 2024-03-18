import { Component, OnInit } from '@angular/core';
import { PokemonModel } from '@models/pokemon-model';
import { PokeApiService } from '@services/poke-api.service';
import { POKEMON_GENERATION } from '@utils/constant';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pokemons$:Observable<PokemonModel[]> = of([]);
  pokemonGeneration = POKEMON_GENERATION;

  constructor(private pokeApi: PokeApiService) { }

  ngOnInit(): void {
    this.getPokemonByGeneration("gen1")
  }

  getPokemonByGeneration(generation:string){
    this.pokemons$ =  this.pokeApi.getPokemonData(generation)
    this.pokemons$.subscribe(data => console.log(data[0]))
  }

  updateGeneration(value:string){
    this.getPokemonByGeneration(value)
  }

}
