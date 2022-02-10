const count = function (str: string, letter: string) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === letter) count++;
  }

  return count;
};

function originalDigits(s: string): string {
  s = s.toLowerCase();
  const ans: { [key: number]: number } = {};
  ans[0] = count(s, "z");
  ans[2] = count(s, "w");
  ans[4] = count(s, "u");
  ans[6] = count(s, "x");
  ans[8] = count(s, "g");

  ans[3] = count(s, "h") - ans[8];
  ans[7] = count(s, "s") - ans[6];
  ans[5] = count(s, "v") - ans[7];
  ans[9] = count(s, "i") - ans[5] - ans[6] - ans[8];
  ans[1] = count(s, "n") - ans[9] * 2 - ans[7];

  let result = "";
  for (let i = 0; i < 10; i++) {
    result += new String(i).repeat(ans[i]);
  }
  return result;
}

const ZERO = ["Z", "E", "R", "O"]; // [EORZ]
const ONE = ["O", "N", "E"]; // [EON]
const TWO = ["T", "W", "O"]; // [OTW]
const THREE = ["T", "H", "R", "E", "E"]; // [EEHRT]
const FOUR = ["F", "O", "U", "R"]; // [FOUR]
const FIVE = ["F", "I", "V", "E"]; // [EFIV]
const SIX = ["S", "I", "X"]; // [ISX]
const SEVEN = ["S", "E", "V", "E", "N"]; // [EENSV]
const EIGHT = ["E", "I", "G", "H", "T"]; // [EGHIT]
const NINE = ["N", "I", "N", "E"]; // [EINN]

const map = {
  E: [0, 1, 3, 5, 7, 8, 9],
  F: [4, 5],
  H: [3, 8],
  G: [8],
  O: [0, 2, 4],
  T: [2, 3, 8],
  N: [1, 7, 9],
  I: [5, 6, 8, 9],
  S: [6, 7],
  V: [5, 7],
  R: [0, 3, 4],
  U: [4],
  W: [2],
  X: [6],
  Z: [0],
};
