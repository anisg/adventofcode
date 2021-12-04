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
  // parse
  let actions: { name: "forward" | "up" | "down"; value: number }[] = [];
  let s = "";
  while ((s = readline())) {
    const [name, valueStr] = s.split(" ");
    actions.push({ name: name as any, value: Number.parseInt(valueStr) });
  }

  // solve
  let [horizontal, depth] = [0, 0];
  actions.forEach((action) => {
    switch (action.name) {
      case "forward":
        horizontal += action.value;
        break;
      case "up":
        depth -= action.value;
        break;
      case "down":
        depth += action.value;
        break;
    }
  });
  console.log(`${horizontal} x ${depth} = ${horizontal * depth}`);
}
