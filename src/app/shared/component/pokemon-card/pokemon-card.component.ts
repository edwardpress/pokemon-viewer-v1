import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PokemonModel } from '../../../model/pokemon-model';
import { getTypingColor, getPokemonImageUrl } from '../../utils/constant';
import { MatDialog } from '@angular/material/dialog';
import { ChartOptions } from 'src/app/model/chart-options';
import { PokeApiService } from 'src/app/service/poke-api.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemon!: PokemonModel;
  @ViewChild('pokemonDetail')pokemonDetail!: TemplateRef<any>;
  statlineOptions!: ChartOptions;
  flavorText!: Observable<string>;


  constructor(private dialog: MatDialog, private pokeApiService: PokeApiService) { }

  ngOnInit(): void {

    this.statlineOptions = {
      series: [
        {
          name: "basic",
          data: [...this.pokemon.stats.map(res=>res.base_stat)]
        }
      ],
      chart: {
        type: "bar",
        height: 250,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      xaxis: {
        categories: [
          "HP",
          "Attack",
          "Defense",
          "Special Attack",
          "Special Defense",
          "Speed",
        ]
      },
      

    };
  }

  viewPokemonDetail(dialog:TemplateRef<any>){

      this.dialog.open(dialog,{
 
      })


    this.flavorText = this.pokeApiService.getPokemonFlavorText(this.pokemon.id)
      
  }

  getPokemonImageUrl(id:number){
    return getPokemonImageUrl(id)
  }

  getBackgroundColor(type:string){
    return getTypingColor(type)
  }


}
