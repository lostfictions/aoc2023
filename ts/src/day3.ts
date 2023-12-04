import { clean, load } from "./util";

function part1(lines: string[]) {
  const rowLength = lines[0].length;
  const rowCount = lines.length;

  const numberMatches = lines.map((l) =>
    [...l.matchAll(/\d+/dg)].map(
      (match) => [Number.parseInt(match[0]), match.indices![0]] as const,
    ),
  );

  const valid: number[] = [];

  for (let row = 0; row < numberMatches.length; row++) {
    for (const [num, [start, end]] of numberMatches[row]) {
      let touchingSymbol = false;

      // prettier-ignore
      for (let j = Math.max(0, row - 1); j <= Math.min(rowCount - 1, row + 1); j++) {
        for (let i = Math.max(0, start - 1); i <= Math.min(rowLength - 1, end); i++) {
          if (/[!@#$%^&*()\-=\\/+_'"[\]:;,<>?{}|~`]/.test(lines[j][i])) {
            touchingSymbol = true;
          }
        }
      }

      if (touchingSymbol) valid.push(num);
    }
  }

  return valid.reduce((p, c) => p + c, 0);
}

function part2(lines: string[]) {
  const rowLength = lines[0].length;
  const rowCount = lines.length;

  const numberMatches = lines.map((l) =>
    [...l.matchAll(/\d+/dg)].map(
      (match) => [Number.parseInt(match[0]), match.indices![0]] as const,
    ),
  );

  // maps from `x,y` to list of adjacent number
  const adjacencies: Record<string, number[]> = {};

  for (let row = 0; row < numberMatches.length; row++) {
    for (const [num, [start, end]] of numberMatches[row]) {
      // prettier-ignore
      for (let j = Math.max(0, row - 1); j <= Math.min(rowCount - 1, row + 1); j++) {
        for (let i = Math.max(0, start - 1); i <= Math.min(rowLength - 1, end); i++) {
          if (lines[j][i] === "*") {
            const arr = adjacencies[`${j},${i}`] ?? [];
            arr.push(num);
            adjacencies[`${j},${i}`] = arr;
          }
        }
      }
    }
  }

  const multiplied = Object.values(adjacencies)
    .filter((arr) => arr.length === 2)
    .map((arr) => arr[0] * arr[1]);

  return multiplied.reduce((p, c) => p + c, 0);
}

const sample = clean(`
  467..114..
  ...*......
  ..35..633.
  ......#...
  617*......
  .....+.58.
  ..592.....
  ......755.
  ...$.*....
  .664.598..
`);
// console.log(part1(sample));
// console.log(part1(load(__filename)));
// console.log(part2(sample));
console.log(part2(load(__filename)));
