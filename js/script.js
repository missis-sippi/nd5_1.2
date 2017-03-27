const Pokemon = require('./Pokemon');
const PokemonList = require('./PokemonList');
const hide = require('./hidenseek').hide;
const seek = require('./hidenseek').seek;

const path = '../field';
/*const pokemons = require('../data/pokemons.json');*/
const pokemons = [
  {name: 'lost1', level: 12},
  {name: 'lost2', level: 13},
  {name: 'lost3', level: 0},
  {name: 'lost4', level: 15},
  {name: 'found1', level: 12},
  {name: 'found2', level: 13},
  {name: 'found3', level: 0},
  {name: 'found4', level: 15}
];


const pokemonObjects = pokemons.map(
  object => new Pokemon(object.name, object.level)
);

const lost = new PokemonList(...pokemonObjects.slice(0, 4));
const found = new PokemonList(...pokemonObjects.slice(4));

//lost.show();
hide(path, lost);
seek(path);


