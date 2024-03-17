import { Component, OnInit } from '@angular/core';
import { PokemonModel } from '../../model/pokemon-model';
import { PokeApiService } from '../../service/poke-api.service';
import { Observable, of } from 'rxjs';
import { POKEMON_GENERATION } from 'src/app/shared/utils/constant';

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
  }

  updateGeneration(value:string){
    this.getPokemonByGeneration(value)
  }

}
