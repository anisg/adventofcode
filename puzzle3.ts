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
function readintline() {
  const s = readline();
  if (!s) return [];
  return s.split(" ").map((e) => Number.parseInt(e));
}
// ------------------------------

function getMostCommonBitsArr(arr: string[]): number[] {
  const n = arr.length;
  const m = arr[0].length;
  let resp = [];
  for (let x = 0; x < m; x++) {
    let count1 = 0;
    let count0 = 0;
    for (let y = 0; y < n; y++) {
      count1 += arr[y][x] == "1" ? 1 : 0;
      count0 += arr[y][x] == "0" ? 1 : 0;
    }
    if (count1 >= count0) {
      resp.push(1);
    } else {
      resp.push(0);
    }
  }
  return resp;
}

function getLeastCommonBitsArr(arr: string[]): number[] {
  const n = arr.length;
  const m = arr[0].length;
  let resp = [];
  for (let x = 0; x < m; x++) {
    let count1 = 0;
    let count0 = 0;
    for (let y = 0; y < n; y++) {
      count1 += arr[y][x] == "1" ? 1 : 0;
      count0 += arr[y][x] == "0" ? 1 : 0;
    }
    if (count1 <= count0) {
      resp.push(1);
    } else {
      resp.push(0);
    }
  }
  return resp;
}

function bitsArrToNumber(arr: number[]): number {
  let v = 0;
  const n = arr.length;
  arr.forEach((bit, i) => {
    v |= bit << (n - i - 1);
  });
  return v;
}

function getGamaRate(arr: string[]): number {
  const mostCommonBitsArr = getMostCommonBitsArr(arr);
  return bitsArrToNumber(mostCommonBitsArr);
}

function getEpsilonRate(arr: string[]): number {
  const leastCommonBitsArr = getLeastCommonBitsArr(arr);
  return bitsArrToNumber(leastCommonBitsArr);
}

function main() {
  // parse
  let arr: string[] = [];
  let s;
  while ((s = readline())) {
    arr.push(s);
  }

  // solve
  let [gamaRate, epsilonRate] = [getGamaRate(arr), getEpsilonRate(arr)];
  console.log(`${gamaRate} x ${epsilonRate} = ${gamaRate * epsilonRate}`);
}
