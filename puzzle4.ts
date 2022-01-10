// ------------------------------
export {};
process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let lines = [];
let currentLine = 0;

process.stdin.on("data", (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on("end", (_) => {
  lines = inputString
    .trim()
    .split("\n")
    .map((string) => {
      return string.trim();
    });

  main();
});

function readline() {
  return lines[currentLine++];
}
function readintline(): number[] {
  const s = readline();
  if (!s) return [];
  return s.split(" ").map((e) => Number.parseInt(e.trim()));
}
// ------------------------------

type Bingo = {
  hasWon: boolean;
  grid: { value; crossed: boolean }[][];
};

function checkHasWon(bingo: Bingo, x: number, y: number): boolean {
  return (
    bingo.grid[y].every((cell) => cell.crossed == true) ||
    [...Array.from({ length: bingo.grid.length }, (_, i) => i)].every(
      (pos) => bingo.grid[pos][x].crossed == true
    )
  );
}

function crossNumber(bingo: Bingo, n: number) {
  bingo.grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.value == n) {
        cell.crossed = true;
        if (checkHasWon(bingo, x, y)) {
          bingo.hasWon = true;
        }
      }
    });
  });
}

function sumUnmarked(bingo: Bingo) {
  let res = 0;
  bingo.grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!cell.crossed) {
        res += cell.value;
      }
    });
  });
  return res;
}

function main() {
  // parse
  let bingoGrids: Bingo[] = [];
  let numbers: number[] = [];
  numbers = readline()
    .split(",")
    .map((nbAsStr) => Number.parseInt(nbAsStr.trim()));

  readline(); // empty line

  let tmp: string;
  bingoGrids[0] = {
    grid: [],
    hasWon: false,
  };
  while (currentLine < lines.length) {
    tmp = readline();
    if (tmp.length == 0) {
      bingoGrids.push({
        grid: [],
        hasWon: false,
      });
      continue;
    }
    bingoGrids[bingoGrids.length - 1].grid.push(
      tmp
        .split("\n")
        .map((nbAsStr) => parseInt(nbAsStr))
        .map((nb) => ({ value: nb, crossed: false }))
    );
  }

  // solve
  let score = -1;
  let solved = false;
  for (let n of numbers) {
    for (let bingo of bingoGrids) {
      crossNumber(bingo, n);
      if (bingo.hasWon) {
        score = sumUnmarked(bingo) * n;
        solved = true;
        break;
      }
    }
    if (solved) {
      break;
    }
  }
  console.log("FINISH:", score);
}
