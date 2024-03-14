import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PokeApiService } from './service/poke-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private pokeApi:PokeApiService, private http: HttpClient) {}

  ngOnInit() {
    this.pokeApi.getPokemonByGen(151,0).subscribe(res=>{
      console.log("RES",res)
      
      

    })
  }
}
