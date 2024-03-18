import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ChartOptions } from 'src/app/model/chart-options';
import { PokeApiService } from '../../../service/poke-api.service';
import { PokemonCardComponent } from './pokemon-card.component';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockPokeApiService: jasmine.SpyObj<PokeApiService>;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const pokeApiServiceSpy = jasmine.createSpyObj('PokeApiService', ['getPokemonFlavorText']);

    await TestBed.configureTestingModule({
      declarations: [PokemonCardComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: PokeApiService, useValue: pokeApiServiceSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    mockPokeApiService = TestBed.inject(PokeApiService) as jasmine.SpyObj<PokeApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog when viewPokemonDetail is called', () => {
    const mockTemplateRef = {} as any;
    component.viewPokemonDetail(mockTemplateRef);
    expect(mockDialog.open).toHaveBeenCalledWith(mockTemplateRef);
  });

  it('should return the correct image URL for a given Pokemon ID', () => {
    const pokemonId = 1;
    const expectedImageUrl = `https://pokeapi.co/media/sprites/pokemon/${pokemonId}.png`;
    const imageUrl = component.getPokemonImageUrl(pokemonId);
    expect(imageUrl).toBe(expectedImageUrl);
  });

  it('should return the correct background color for a given Pokemon type', () => {
    const type = 'fire';
    const expectedColor = 'red';
    const color = component.getBackgroundColor(type);
    expect(color).toBe(expectedColor);
  });

  it('should set the flavorText property correctly', () => {
    const mockFlavorText = 'This is a mock flavor text';
    mockPokeApiService.getPokemonFlavorText.and.returnValue(of(mockFlavorText));
    component.ngOnInit();
    expect(component.flavorText).toBeInstanceOf(Observable);
    component.flavorText.subscribe((text) => {
      expect(text).toBe(mockFlavorText);
    });
  });


  it('should set the statlineOptions property correctly', () => {
    const expectedOptions: ChartOptions = {
      series: [
        {
          data: [12, 134, 33, 44, 66, 77],
        },
      ],
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
      },
      xaxis: {
        categories: [
          "HP",
          "Attack",
          "Defense",
          "Special Attack",
          "Special Defense",
          "Speed",
        ],
      },
    };

    expect(component.statlineOptions).toEqual(expectedOptions);
  });
  });



