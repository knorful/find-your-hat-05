const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
  }

  print() {
    for (let i = 0; i < this._field.length; i++) {
      let row = [];
      let pos = this._field[i];
      for (let j = 0; j < pos.length; j++) {
        row.push(pos[j]);
      }
      console.log(row.join(""));
    }
  }

  playGame() {
    let gameOver = false;

    while (!gameOver) {
      this.print();
      let userInput = prompt("Which Way?");
    }
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

myField.playGame();
