import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { PokemonCardComponent } from './component/pokemon-card/pokemon-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [PokemonCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    NgApexchartsModule,
    MatMenuModule

  ],
  exports: [
    FormsModule,
    PokemonCardComponent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class SharedModule { }
