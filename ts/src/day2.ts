import { clean, load } from "./util";

function parse(game: string) {
  return game
    .slice(game.indexOf(": ") + 2)
    .split("; ")
    .map((set) =>
      Object.fromEntries(
        set.split(", ").map((i) => {
          const [count, color] = i.split(" ");
          return [color, Number.parseInt(count)];
        }),
      ),
    );
}

function part1(lines: string[]) {
  const possibleGames = lines
    .map((l, i) => [parse(l), i + 1] as const)
    .filter(([game]) =>
      game.every(
        (set) => !(set["red"] > 12 || set["green"] > 13 || set["blue"] > 14),
      ),
    );

  return possibleGames.reduce((p, [, c]) => p + c, 0);
}

function part2(lines: string[]) {
  const powers = lines.map((l) => {
    const sets = parse(l);
    const max = { red: 0, green: 0, blue: 0 } as Record<string, number>;
    for (const set of sets) {
      for (const [color, count] of Object.entries(set)) {
        max[color] = Math.max(count, max[color]);
      }
    }

    return Object.values(max).reduce((p, c) => p * c, 1);
  });

  return powers.reduce((p, c) => p + c, 0);
}

// const sample = clean(`
//   Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
//   Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
//   Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
//   Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
//   Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
// `);
// console.log(part1(sample));
// console.log(part2(sample));

console.log(part2(load(__filename)));
