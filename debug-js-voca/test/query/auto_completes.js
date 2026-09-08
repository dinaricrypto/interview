import v from '../voca';

// TODO: Add autoCompletes function the the "query" family of functions
// auto_completes takes an array of terms and a prefix search term and returns
// an array of possible autocomplete results.

// If there are exact prefix matches, return those.
// If there are no exact prefix matches, switch to fuzzy prefix mode

// Fuzzy prefix mode is similar to exact prefix mode but returns a result even if it
// contains a 1 character *substitution*

// Fuzzy matches:
// (search) : (target)
// . - Zen : Zel
// . - Zen : gen
// . - Zen : Denver (1 substitution)

// Not fuzzy matches:
//   - Zen : Ze (target is too short)
// . - Zen : Zom (2 substitutions)

describe('auto_completes', () => {
  it('returns null on empty search array', () => {
    expect(v.autoCompletes([], 'searchterm')).toEqual(null);
    expect(v.autoCompletes([''], 'searchterm')).toEqual(null);
    expect(v.autoCompletes([' '], 'searchterm')).toEqual(null);
  });

  it('returns null on empty search term', () => {
    expect(v.autoCompletes(['term1'], '')).toEqual(null);
    expect(v.autoCompletes(['term1'], '')).toEqual(null);
  });

  it('returns correct answer with 1 search term', () => {
    expect(v.autoCompletes(['term1'], 't')).toEqual(['term1']);
    expect(v.autoCompletes(['term1'], 'te')).toEqual(['term1']);
    expect(v.autoCompletes(['term1'], 'ter')).toEqual(['term1']);
    expect(v.autoCompletes(['term1'], 'tug')).toEqual([]);

    expect(v.autoCompletes(['term1'], ' ter')).toEqual(['term1']);
    expect(v.autoCompletes(['term1'], 'ter ')).toEqual(['term1']);
  });

  describe('returns correct answer with multiple search terms', () => {
    const searchTerms = [
      'Kentucky',
      'North Dakota',
      'North Carolina',
      'New York',
      'New Jersey',
      'New Mexico',
      'Nebraska',
      'Tennessee',
    ];

    it('exact matches', () => {
      expect(v.autoCompletes(searchTerms, 'nug')).toEqual([]);
      expect(v.autoCompletes(searchTerms, 'n').sort()).toEqual([
        'Nebraska',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
      ]);
      expect(v.autoCompletes(searchTerms, 'ne').sort()).toEqual(['Nebraska', 'New Jersey', 'New Mexico', 'New York']);
      expect(v.autoCompletes(searchTerms, 'neb').sort()).toEqual(['Nebraska']);
    });

    it('fuzzy matches', () => {
      expect(v.autoCompletes(searchTerms, 'r')).toEqual([]);
      expect(v.autoCompletes(searchTerms, 're')).toEqual([]);
      expect(v.autoCompletes(searchTerms, 'jen').sort()).toEqual(['Kentucky', 'Tennessee']);
      expect(v.autoCompletes(searchTerms, 'now').sort()).toEqual([
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
      ]);
    });
  });
});
