import { Component, Input, OnInit } from '@angular/core';
import { PokemonModel } from '../../../model/pokemon-model';
import { getTypingColor } from '../../utils/constant';


@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemon!: PokemonModel;

  constructor() { }

  ngOnInit(): void {
  }

  getPokemonImageUrl(id:number){
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  }

  getBackgroundColor(type:string){
    return getTypingColor(type)
  }
}
