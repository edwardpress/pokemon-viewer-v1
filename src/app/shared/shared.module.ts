import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { PokemonCardComponent } from './component/pokemon-card/pokemon-card.component';


@NgModule({
  declarations: [PokemonCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule
  ],
  exports: [
    FormsModule,
    PokemonCardComponent
  ]
})
export class SharedModule { }
