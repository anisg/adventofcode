// ------------------------------
{
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
}
// ------------------------------

function main() {
  let arr = [];
  let v = 0;
  while (([v] = readintline()) && typeof v == "number") {
    arr.push(v);
  }

  let res = 0;
  arr.forEach((_, i) => {
    if (i == 0) return;
    arr[i] > arr[i - 1] && res++;
  });

  console.log(res);
}
