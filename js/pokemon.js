'use strict';
class Pokemon {
  constructor(name, level){
    this.name = name;
    this.level = level;
  }
  show() {
    console.log("%s - level %d", this.name, this.level);
  }
  valueOf() {
    return parseInt(this.level);
  };
}

module.exports = Pokemon;
