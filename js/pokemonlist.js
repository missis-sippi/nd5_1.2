class PokemonList extends Array {
  add(name, level) {
    let pokemon = new Pokemon(name, level);
    this.push(pokemon);
  }
  show() {
    console.log("Total pokemon number: %d", this.length);
    this.forEach(function(item){
      item.show();
    });
  }
  max() {
    let max = this[0];
    for(let item of this){
      if(item.valueOf() > max.valueOf()) {
        max = item;
      }
    }
    console.log("Pokemon %s has maximum level of %d", max.name, max.level); 
  }
}
module.exports = PokemonList;