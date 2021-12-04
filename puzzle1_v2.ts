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

function main() {
  let arr = [];
  let v = 0;
  while (([v] = readintline()) && typeof v == "number") {
    arr.push(v);
  }

  // solve
  const n = arr.length;
  let prev = 0;
  let res = 0;
  arr.forEach((_, i) => {
    if (i >= n - 2) return;
    const cur = arr[i] + arr[i + 1] + arr[i + 2];
    if (i > 0 && cur > prev) {
      res += 1;
    }
    prev = cur;
  });
  console.log(res);
}
