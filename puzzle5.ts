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

type Point = {
  x: number;
  y: number;
};
type Line = {
  a: Point;
  b: Point;
};

function main() {
  // parse
  let lines: Line[] = [];
  let lineTmp = null;
  while ((lineTmp = readline()) != null) {
    const [[aX, aY], [bX, bY]] = lineTmp
      .split(" -> ")
      .map((s) => s.split(",").map((nb) => parseInt(nb)));
    lines.push({ a: { x: aX, y: aY }, b: { x: bX, y: bY } });
  }

  // solve
  let m = {};
  function getHashPos(p: Point): string {
    return `${p.x},${p.y}`;
  }

  function getTracee(line: Line): Point[] {
    if (line.a.x != line.b.x) {
      //assume its an horizontal line
      return [...Array(Math.abs(line.b.x - line.a.x) + 1)].map((_, pos) => ({
        x: Math.min(line.a.x, line.b.x) + pos,
        y: line.a.y,
      }));
    } else {
      //assume its a vertical line
      return [...Array(Math.abs(line.b.y - line.a.y) + 1)].map((_, pos) => ({
        x: line.a.x,
        y: Math.min(line.a.y, line.b.y) + pos,
      }));
    }
  }

  function isLine(line: Line) {
    return line.a.x == line.b.x || line.a.y == line.b.y;
  }

  lines
    .filter((line) => isLine(line))
    .forEach((line) => {
      const tracees = getTracee(line);
      tracees.forEach((point) => {
        m[getHashPos(point)] = (m[getHashPos(point)] || 0) + 1;
      });
    });

  console.log(
    "number of points that overlap ->",
    Object.keys(m).filter((key) => m[key] > 1).length
  );
}
