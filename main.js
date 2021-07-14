const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.xPos = 0;
    this.yPos = 0;
    this.gameOver = false;
  }

  print() {
    for (let i = 0; i < this.field.length; i++) {
      let row = [];
      let pos = this.field[i];
      for (let j = 0; j < pos.length; j++) {
        row.push(pos[j]);
      }
      console.log(row.join(""));
    }
  }

  playGame() {
    while (!this.gameOver) {
      this.print();
      this.getUserInput();
    }
  }

  getUserInput() {
    let userInput = prompt("Which Way?");

    switch (userInput) {
      case "w":
        this.field[--this.yPos][this.xPos] = pathCharacter;
        break;
      case "a":
        this.field[this.yPos][--this.xPos] = pathCharacter;
        break;
      case "s":
        this.field[++this.yPos][this.xPos] = pathCharacter;
        break;
      case "d":
        this.field[this.yPos][++this.xPos] = pathCharacter;
        break;
    }
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

myField.playGame();
// console.log("pos", myField.playerPos);
