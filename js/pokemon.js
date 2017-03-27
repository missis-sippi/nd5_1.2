class Pokemon {
  constructor(name, level){
    this.name = name;
    this.level = level;
  }
  show() {
    console.log("%s - level %d", this.name, this.level);
  }
}

Pokemon.prototype.valueOf = function() {
  return parseInt(this.level);
};

module.exports = Pokemon;
