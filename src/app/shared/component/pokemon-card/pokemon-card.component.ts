import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartOptions } from '@models/chart-options';
import { PokemonModel } from '@models/pokemon-model';
import { PokeApiService } from '@services/poke-api.service';
import { getPokemonImageUrl, getTypingColor } from '@utils/constant';
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
          data: [...this.pokemon.stats.map(res=>res.base_stat)]
        }
      ],
      chart: {
        type: "bar",
        toolbar: {
          show: false
        },
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
        width:"50vw",
        minWidth: "400px"
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
