import { readFileSync } from "fs";

const input = readFileSync("../inputs/day1", "utf8").trim();

function part1(data: string) {
  const numbers = data.split("\n").map((line) => {
    const digits = [...line].filter((char) => /\d/.test(char));
    return Number.parseInt(`${digits.at(0)}${digits.at(-1)}`);
  });

  return numbers.reduce((p, c) => p + c, 0);
}

function part2(data: string) {
  const numbers = data.split("\n").map((line) => {
    const digits = [
      // we need to allow overlapping matches (for example, "oneight" should
      // yield both 1 and 8 in the results) so we use a regex with a lookahead
      // assertion (?=...) -- but that excludes the result from the match, so we
      // have to wrap the inside of the assertion in a capture group, ie. (?=(...))
      ...line.matchAll(
        /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g,
      ),
    ].map((match) => {
      switch (match[1]) {
        case "one":
          return 1;
        case "two":
          return 2;
        case "three":
          return 3;
        case "four":
          return 4;
        case "five":
          return 5;
        case "six":
          return 6;
        case "seven":
          return 7;
        case "eight":
          return 8;
        case "nine":
          return 9;
        default:
          return Number.parseInt(match[1]);
      }
    });
    console.log(digits.join(" "));
    return Number.parseInt(`${digits.at(0)}${digits.at(-1)}`);
  });

  return numbers.reduce((p, c) => p + c, 0);
}

// const sample = `1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet`;
// console.log(day1(sample));

// console.log(part1(input));

// const sample2 = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`;
// console.log(part2(sample2));

console.log(part2(input));
