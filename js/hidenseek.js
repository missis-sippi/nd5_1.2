'use strict';
const fs = require('fs');
const conf = {encoding: 'utf-8'};
const Pokemon = require('./Pokemon');
const PokemonList = require('./PokemonList');

const foldersNumber = 10;

const hide = function(path, poklist) {
  return new Promise((resolve,reject) => {
    //массив покемонов для запрятывания:
    let hidingPoks = [];
    let num = (poklist.length > 3) ? randomInteger(1,3) : randomInteger(1, poklist.length);

    for(let i=0; i < num; i++) {
      hidingPoks.push(poklist[randomInteger(1, poklist.length)-1]);
    }
    makeDirs(path)
      .then(
        response => {
          hidePoks(path, hidingPoks);
        }
      )
    //console.log('спрятано!');
    resolve(hidingPoks);
  });
};

const seek = function(path) {
  return new Promise((resolve, reject) => {
    let directories = [];
    for (let i=0; i <= foldersNumber; i++){
      let num  = path + '/0' + i;
      directories.push(num);
    }

    //промис вернется только тогда, когда весь массив промисов-аргументов будет выполнен:
    Promise.all(directories.map(seekForPoks))
      .then(
        result => {
          const foundPoks = new PokemonList();
          for(let i of result) {
            if(i) foundPoks.add(i.split('|')[0], i.split('|')[1]);
          }
          console.log('\nНайденные покемоны: ');
          foundPoks.show();
          resolve(foundPoks);
        });
  });
};

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, conf, (err, data) => {
      if (err) {
        if(err.code === 'ENOENT'){ //если нет такого файла
          resolve(false);
        }
        else reject(err);
      }
      else resolve(data);
    });
  });
};

function randomInteger (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function makeDirs (path) {
  return new Promise(function(resolve, reject) {
    for(let i = 1; i <= foldersNumber; i++) {
      let foldername = path + '/0' + i;
      fs.mkdir(foldername, err => {
        if(err) reject(err);
        else if((err && err.code === 'EEXIST') || !err) {
          //console.log('папка %s создана', foldername);
        }
      });
    }
    resolve("promise resolved");
  });
}

function chooseDirs(number) {
  let randDirs = [];
  for (let i=0; i<number; i++) {
    let item = randomInteger(1, 10);
    randDirs.push(item);
  }
  console.log('новую партию покемонов прятать будем в этих папках: ', randDirs);

  //возвращает массив случайных номеров директорий
  return randDirs;
}

const hidePoks = function(path, hidingpoks) {
  let len = hidingpoks.length;
  //массив путей к случайным директориям:
  let randpaths = chooseDirs(len);
  for (let i=0; i < len; i++) {
    //выбор случайного покемона для запрятывания:
    let randpath = path + '/0' + randpaths[i] + '/pokemon.txt';
    let hidingpok = hidingpoks[randomInteger(0, hidingpoks.length - 1)];
    let pokemonContent = hidingpok.name + ' | ' + hidingpok.level;

  //  console.log('прячем вот такого очередного покемона:  ', hidingpok);
    fs.writeFile(randpath, pokemonContent, conf, err => {
      if(err) throw err;
      console.log('покемон спрятан');
		});
  }
}

//поиск файла pokemon.txt:
const seekForPoks = function(path) {
    return new Promise((resolve, reject) => {
      //console.log('ищем в папке ', path + '/pokemon.txt');
      fs.readFile(path + '/pokemon.txt', conf, (err,data) => {
        if(err) resolve(null);
        else resolve(data);
      });
    });
}

module.exports = {
  hide,
  seek
};
