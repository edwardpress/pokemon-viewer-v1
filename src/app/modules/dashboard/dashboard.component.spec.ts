import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core'; // import NO_ERRORS_SCHEMA
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { By, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { POKEMON_GENERATION } from 'src/app/shared/utils/constant';
import { PokeApiService } from '../../service/poke-api.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let pokeApiService: jasmine.SpyObj<PokeApiService>;

  beforeEach(async () => {
    const pokeApiSpy = jasmine.createSpyObj('PokeApiService', [
      'getPokemonData','getPokemonByGen'
    ]);
    pokeApiSpy.getPokemonData.and.returnValue(
      of([
        {
          ability: {
            name: 'overgrow',
            url: 'https://pokeapi.co/api/v2/ability/65/',
          },
          is_hidden: false,
          slot: 1,
        },
        {
          ability: {
            name: 'chlorophyll',
            url: 'https://pokeapi.co/api/v2/ability/34/',
          },
          is_hidden: true,
          slot: 3,
        },
      ])
    );
    const iconRegistrySpy = jasmine.createSpyObj('MatIconRegistry', [
      'addSvgIcon',
      'getNamedSvgIcon',
    ]);
    const sanitizerSpy = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustResourceUrl',
    ]);
    iconRegistrySpy.getNamedSvgIcon.and.returnValue(of('<svg></svg>')); // return a dummy SVG

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        MatIconModule,
        MatMenuModule,
        HttpClientModule,
        MatDialogModule,
        MatCardModule,
        MatChipsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: PokeApiService, useValue: pokeApiSpy },
        { provide: MatIconRegistry, useValue: iconRegistrySpy },
        { provide: DomSanitizer, useValue: sanitizerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    pokeApiService = TestBed.inject(
      PokeApiService
    ) as jasmine.SpyObj<PokeApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should initialize pokemonGeneration with POKEMON_GENERATION constant', () => {
    expect(component.pokemonGeneration).toEqual(POKEMON_GENERATION);
  });

  it('should call getPokemonByGen with the provided generation', () => {
    const generation = 'gen1';
    component.getPokemonByGeneration(generation);
    expect(pokeApiService.getPokemonData).toHaveBeenCalledWith('gen1');
  });

  it('should call getPokemonByGeneration with "gen2" when generation II menu item is clicked', () => {
    const generation = 'gen2';
    const menuTrigger = fixture.debugElement.query(By.css('.fab'));  
    menuTrigger.triggerEventHandler('click', null);
    fixture.detectChanges();
  
    const menuItems = fixture.debugElement.queryAll(By.css('button[mat-menu-item]'));
    const menuItem = menuItems.find(de => de.nativeElement.textContent.trim() === "GENERATION II");  

    spyOn(component, 'updateGeneration');
    menuItem?.nativeElement.click()
    fixture.detectChanges();
  
    expect(component.updateGeneration).toHaveBeenCalledWith(generation);
  });
});
