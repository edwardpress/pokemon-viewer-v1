import { Component, OnInit } from '@angular/core';
import { PokemonModel } from '../../model/pokemon-model';
import { PokeApiService } from '../../service/poke-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pokemons:PokemonModel[] = [];

  constructor(private pokeApi: PokeApiService) { }

  ngOnInit(): void {
    this.pokeApi.getPokemonByGen(151,0).subscribe((pokemons:PokemonModel[])=>{
      console.log("POKE",pokemons)
      this.pokemons = pokemons
    })
  }

}
