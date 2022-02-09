function rotateTheBox(box: string[][]): string[][] {
  let rotatedBox = rotateBox(box);
  adjustTheBox(rotatedBox);
  return rotatedBox;
}

function rotateBox(box: string[][]): string[][] {
  let result: string[][] = new Array(box[0].length)
    .fill(0)
    .map(() => new Array(box.length).fill("*"));
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      result[i][j] = box[result[i].length - 1 - j][i];
    }
  }
  return result;
}

function adjustTheBox(box: string[][]): void {
  for (let col = 0; col < box[0].length; col++) {
    let lastPos = box.length - 1;
    let row = box.length - 1;
    let stones = 0;
    while (row >= 0) {
      if (isStone(box[row][col])) stones++;
      else if (isObstacle(box[row][col])) {
        while (lastPos > row) {
          if (stones > 0) {
            box[lastPos--][col] = "#";
            stones--;
          } else {
            box[lastPos--][col] = ".";
          }
        }
      } else if (row === 0) {
        while (lastPos >= 0) {
          if (stones > 0) {
            box[lastPos--][col] = "#";
            stones--;
          } else {
            box[lastPos--][col] = ".";
          }
        }
      }
      row--;
    }
  }
}

const isStone = (str) => str === "#";
const isObstacle = (str) => str === "*";
const isEmpty = (str) => str === ".";
