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
    this.fellInHole = false;
    this.outOfBounds = false;
    this.foundHat = false;
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
      this.loseOrWin();
    }
  }

  getUserInput() {
    let userInput = prompt("Which Way? (w|a|s|d): ");

    switch (userInput) {
      case "w":
        if (this.checkOutOfBounds("y", this.yPos - 1) === false) {
          this.checkForHat(this.yPos - 1, this.xPos);
          this.checkForHole(this.yPos - 1, this.xPos);
        }
        break;
      case "a":
        if (this.checkOutOfBounds("x", this.xPos - 1) === false) {
          this.checkForHat(this.yPos, this.xPos - 1);
          this.checkForHole(this.yPos, this.xPos - 1);
        }
        break;
      case "s":
        if (this.checkOutOfBounds("y", this.yPos + 1) === false) {
          this.checkForHat(this.yPos + 1, this.xPos);
          this.checkForHole(this.yPos + 1, this.xPos);
        }
        break;
      case "d":
        if (this.checkOutOfBounds("x", this.xPos + 1) === false) {
          this.checkForHat(this.yPos, this.xPos + 1);
          this.checkForHole(this.yPos, this.xPos + 1);
        }
        break;
      default:
        console.log("Invalid input. Please try again!");
        break;
    }
  }

  checkForHole(y, x) {
    if (y < 0 || y >= this.field.length) return;
    if (this.field[y][x] !== hole) {
      this.yPos = y;
      this.xPos = x;
      this.field[this.yPos][this.xPos] = pathCharacter;
    } else {
      this.fellInHole = true;
    }
  }

  checkOutOfBounds(action, pos) {
    if (action === "y" && (pos < 0 || pos > this.field.length - 1)) {
      this.outOfBounds = true;
      return true;
    } else if (action === "x" && (pos < 0 || pos > this.field[0].length)) {
      this.outOfBounds = true;
      return true;
    }
    return false;
  }

  checkForHat(y, x) {
    if (this.field[y][x] === hat) {
      this.foundHat = true;
    }
  }

  loseOrWin() {
    if (this.fellInHole) {
      console.log("YOU FELL IN A HOLEEEEEEEEE! Game Over!");
      this.gameOver = true;
    } else if (this.outOfBounds) {
      console.log("You got lost in the forest! Game Over!");
      this.gameOver = true;
    } else if (this.foundHat) {
      console.log("Congrats! You found your hat!");
      this.gameOver = true;
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
