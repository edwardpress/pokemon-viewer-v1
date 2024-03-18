import { getLimitAndOffsetByGen, getPokemonImageUrl, getTypingColor } from './constant';

describe('Constant Utils', () => {
  describe('getTypingColor', () => {
    it('should return the correct color for a given type', () => {
      expect(getTypingColor('normal')).toBe('#A8A77A');
      expect(getTypingColor('fire')).toBe('#EE8130');
      expect(getTypingColor('water')).toBe('#6390F0');
      // Add more test cases for other types
    });

    it('should return undefined for an invalid type', () => {
      expect(getTypingColor('invalid')).toBeUndefined();
    });
  });

  describe('getLimitAndOffsetByGen', () => {
    it('should return the correct limit and offset for a given generation', () => {
      expect(getLimitAndOffsetByGen('gen1')).toEqual({
        label: 'GENERATION I',
        value: 'gen1',
        limit: 151,
        offset: 0
      });
      expect(getLimitAndOffsetByGen('gen2')).toEqual({
        label: 'GENERATION II',
        value: 'gen2',
        limit: 100,
        offset: 151
      });
      expect(getLimitAndOffsetByGen('gen3')).toEqual({
        label: 'GENERATION III',
        value: 'gen3',
        limit: 135,
        offset: 251
      });
      // Add more test cases for other generations
    });

    it('should return undefined for an invalid generation', () => {
      expect(getLimitAndOffsetByGen('invalid')).toBeUndefined();
    });
  });

  describe('getPokemonImageUrl', () => {
    it('should return the correct URL for a given Pokemon ID', () => {
      expect(getPokemonImageUrl(1)).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png');
      expect(getPokemonImageUrl(25)).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
      expect(getPokemonImageUrl(100)).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/100.png');
      // Add more test cases for other Pokemon IDs
    });
  });
});
