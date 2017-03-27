const fs = require('fs');
const conf = {encoding: 'utf-8'};

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }

const hide = function(path, PokemonList) {
	//console.log('чтение из файла');
	for(let i = 1; i <= 10; i++){
  		let name = path + '/0' + i;
  		fs.mkdir(name, err => {
			if(err) throw err;
			//console.log('папка создана');
		});
  	}

	fs.readFile('../data/pokemons.json', conf, (err, content) => {
		if(err) return console.error(err);
		let num = (PokemonList.length > 3) ? 3 : PokemonList.length;
		
		for(let i = 1; i <= num; i++){
			var randpath = path + '/0' + randomInteger(1, 10) + '/pokemon.txt';
			//console.log(randpath);
			var hidingpok = PokemonList[randomInteger(0, PokemonList.length - 1)];
			var pokemonContent = hidingpok.name + ' | ' + hidingpok.level;

			fs.writeFile(randpath, pokemonContent, conf, err => {
				if(err) throw err;
			});
		}		
  	});

}

const seek = function(path) {

}

module.exports = {
  hide,
  seek
};
