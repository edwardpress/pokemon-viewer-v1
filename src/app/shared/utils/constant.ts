export const POKEMON_GENERATION = [
{
  label:"GENERATION I",
  value:"gen1",
  count: 151,
  startingCount: 1
},
{
  label:"GENERATION II",
  value:"gen2",
  count: 100,
  startingCount: 152
},
{
  label:"GENERATION III",
  value:"gen3",
  count: 135,
  startingCount: 252
},
{
  label:"GENERATION IV",
  value:"gen4",
  count: 107,
  startingCount: 387
},
{
  label:"GENERATION V",
  value:"gen5",
  count: 156,
  startingCount: 495
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
