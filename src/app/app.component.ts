import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PokeApiService } from './service/poke-api.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private pokeApi:PokeApiService, private http: HttpClient, private matIconRegistry: MatIconRegistry,private sanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('pokemon', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/pokemon.svg'))
  }

  ngOnInit() {

  }
}
