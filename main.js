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
      console.log("game over? ", this.gameOver);
    }
  }

  getUserInput() {
    let userInput = prompt("Which Way?");

    switch (userInput) {
      case "w":
        this.yPos - 1 >= 0
          ? (this.field[--this.yPos][this.xPos] = pathCharacter)
          : (this.gameOver = true);
        break;
      case "a":
        this.xPos - 1 >= 0
          ? (this.field[this.yPos][--this.xPos] = pathCharacter)
          : (this.gameOver = true);
        break;
      case "s":
        this.yPos + 1 <= this.field.length - 1
          ? (this.field[++this.yPos][this.xPos] = pathCharacter)
          : (this.gameOver = true);
        break;
      case "d":
        this.xPos + 1 <= this.field[0].length - 1
          ? (this.field[this.yPos][++this.xPos] = pathCharacter)
          : (this.gameOver = true);
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
// console.log("field row length", myField.field[0].length);
