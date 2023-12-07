import { clean, load } from "./util";

function parse(lines: string[]) {
  const [seeds, ...mappings] = lines
    .join("\n")
    .split("\n\n")
    .map((cat) => cat.split(/:\s?/)[1]);

  return {
    seeds: seeds.split(" ").map((n) => Number.parseFloat(n)),
    mappings: mappings.map((group) =>
      group
        .split("\n")
        .map((row) => row.split(" ").map((n) => Number.parseInt(n))),
    ),
  };
}

function part1(lines: string[]) {
  const { seeds, mappings } = parse(lines);

  const mapped = seeds.map((s) =>
    mappings.reduce((res, mapping) => {
      const match = mapping.find(
        (row) => row[1] <= res && row[1] + row[2] >= res,
      );
      if (!match) return res;
      return match[0] + (res - match[1]);
    }, s),
  );

  return Math.min(...mapped);
}

// doesn't work on real input yet
function part2(lines: string[]) {
  const { seeds, mappings } = parse(lines);

  let lowest = Number.POSITIVE_INFINITY;
  for (let i = 0; i < seeds.length - 1; i += 2) {
    for (let s = seeds[i]; s < seeds[i] + seeds[i + 1]; s++) {
      const finalMapping = mappings.reduce((res, mapping) => {
        const match = mapping.find(
          (row) => row[1] <= res && row[1] + row[2] >= res,
        );
        if (!match) return res;
        return match[0] + (res - match[1]);
      }, s);
      if (finalMapping < lowest) lowest = finalMapping;
    }
  }

  return lowest;
}

const sample = clean(`
  seeds: 79 14 55 13

  seed-to-soil map:
  50 98 2
  52 50 48

  soil-to-fertilizer map:
  0 15 37
  37 52 2
  39 0 15

  fertilizer-to-water map:
  49 53 8
  0 11 42
  42 0 7
  57 7 4

  water-to-light map:
  88 18 7
  18 25 70

  light-to-temperature map:
  45 77 23
  81 45 19
  68 64 13

  temperature-to-humidity map:
  0 69 1
  1 0 69

  humidity-to-location map:
  60 56 37
  56 93 4
`);

// console.log(part1(sample));
// console.log(part1(load(__filename)));
// console.log(part2(sample));
console.log(part2(load(__filename)));
