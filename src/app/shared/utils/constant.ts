export const POKEMON_GENERATION = [
{
  label:"GENERATION I",
  value:"gen1",
  limit: 151,
  offset: 0
},
{
  label:"GENERATION II",
  value:"gen2",
  limit: 100,
  offset: 151
},
{
  label:"GENERATION III",
  value:"gen3",
  limit: 135,
  offset: 251
},
{
  label:"GENERATION IV",
  value:"gen4",
  limit: 107,
  offset: 386
},
{
  label:"GENERATION V",
  value:"gen5",
  limit: 155,
  offset: 494
}
]

const colours:  {[key: string]: string} = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

export const getTypingColor = (key: string): string => colours[key];

export const getLimitAndOffsetByGen = (gen:string) => POKEMON_GENERATION.find(res=>res.value === gen)!!

export const getPokemonImageUrl = (id:number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`