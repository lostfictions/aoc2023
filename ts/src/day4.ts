import { clean, load } from "./util";

function parse(line: string) {
  const [winning, have] = line
    .split(/:\s+/)[1]
    .split(/\s+\|\s+/)
    .map((leftright) => leftright.split(/\s+/));

  return [new Set(winning), have] as const;
}

function part1(lines: string[]) {
  return lines
    .map((l) => {
      const [winning, have] = parse(l);
      const count = have.filter((n) => winning.has(n)).length;
      return count === 0 ? 0 : 2 ** (count - 1);
    })
    .reduce((p, c) => p + c);
}

function part2(lines: string[]) {
  const multiplier = Array(lines.length).fill(1);

  for (const [i, l] of lines.entries()) {
    const [winning, have] = parse(l);
    const count = have.filter((n) => winning.has(n)).length;

    for (let j = i + 1; j <= Math.min(i + count, lines.length - 1); j++) {
      multiplier[j] += multiplier[i];
    }
  }

  return multiplier.reduce((p, c) => p + c);
}

const sample = clean(`
  Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
  Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
  Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
  Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
  Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`);
// console.log(part1(sample));
// console.log(part1(load(__filename)));
// console.log(part2(sample));
console.log(part2(load(__filename)));
