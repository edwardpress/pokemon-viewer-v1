import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './component/pokemon-card/pokemon-card.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PokemonCardComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    FormsModule,
    PokemonCardComponent
  ]
})
export class SharedModule { }
