import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PokeApiService } from '@services/poke-api.service';
import { of } from 'rxjs';
import { dummyData } from '../../../test/dummyPokemonData';
import { PokemonModel } from '../../models/pokemon-model';
import { getPokemonImageUrl } from '../../utils/constant';
import { PokemonCardComponent } from './pokemon-card.component';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockPokeApiService: jasmine.SpyObj<PokeApiService>;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const pokeApiServiceSpy = jasmine.createSpyObj('PokeApiService', [
      'getPokemonFlavorText',
    ]);

    await TestBed.configureTestingModule({
      declarations: [PokemonCardComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: PokeApiService, useValue: pokeApiServiceSpy },
      ],
      imports: [MatCardModule, MatChipsModule, MatIconModule, MatDialogModule],
    }).compileComponents();

    mockDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    mockPokeApiService = TestBed.inject(
      PokeApiService
    ) as jasmine.SpyObj<PokeApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = dummyData;
    fixture.detectChanges();
    PokemonCardComponent.prototype.pokemon = dummyData;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog when viewPokemonDetail is called', () => {
    const mockTemplateRef = {} as any;
    component.viewPokemonDetail(mockTemplateRef);
    expect(mockDialog.open).toHaveBeenCalledWith(mockTemplateRef, {
      width: '50vw',
      minWidth: '400px',
    });
  });

  it('should return the correct image URL', () => {
    const mockPokemon: PokemonModel = dummyData;
    const imageUrl = component.getPokemonImageUrl(mockPokemon.id);
    expect(imageUrl).toBe(getPokemonImageUrl(mockPokemon.id));
  });

  it('should return the correct background color', () => {
    const type = 'fire';
    const backgroundColor = component.getBackgroundColor(type);
    expect(backgroundColor).toBe('#EE8130');
  });

  it('should set the flavorText property', (done) => {
    const mockFlavorText = 'This is a mock flavor text.';
    const mockTemplateRef = {} as any;

    mockPokeApiService.getPokemonFlavorText.and.returnValue(of(mockFlavorText));
    component.viewPokemonDetail(mockTemplateRef);

    component.flavorText.subscribe((value) => {
      expect(value).toEqual(mockFlavorText);
      done();
    });
  });
});
