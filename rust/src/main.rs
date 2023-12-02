use fancy_regex::Regex;
use std::fs;

fn _part1(data: &str) -> u32 {
    let re = Regex::new(r"\d").unwrap();

    let result = data
        .split('\n')
        .map(|line| {
            let digits: Vec<_> = line
                .trim()
                .chars()
                .filter(|char| re.is_match(&char.to_string()).expect("couldn't run regex"))
                .collect();

            let parsed = format!("{}{}", digits[0], digits.last().expect("no last digit"))
                .parse::<u32>()
                .expect("couldn't parse!");

            parsed
        })
        .fold(0u32, |acc, e| acc + e);

    result
}

fn part2(data: &str) -> u32 {
    let re = Regex::new(r"(?=(\d|one|two|three|four|five|six|seven|eight|nine))").unwrap();

    let result = data
        .split('\n')
        .map(|line| {
            let digits: Vec<char> = re
                .captures_iter(line.trim())
                .map(|c| {
                    match c
                        .expect("couldn't run regex")
                        .get(1)
                        .expect("no group")
                        .as_str()
                    {
                        "one" => '1',
                        "two" => '2',
                        "three" => '3',
                        "four" => '4',
                        "five" => '5',
                        "six" => '6',
                        "seven" => '7',
                        "eight" => '8',
                        "nine" => '9',
                        d => d.chars().next().expect("expected char"),
                    }
                })
                .collect();

            let parsed = format!("{}{}", digits[0], digits.last().expect("no last digit"))
                .parse::<u32>()
                .expect("couldn't parse!");

            parsed
        })
        .fold(0u32, |acc, e| acc + e);

    result
}

fn main() {
    let input = fs::read_to_string("../inputs/day1").expect("couldn't read file");

    // let sample = "1abc2
    // pqr3stu8vwx
    // a1b2c3d4e5f
    // treb7uchet";
    // println!("{}", part1(sample))

    // println!("{}", part1(&input.trim()));

    // let sample2 = "two1nine
    // eightwothree
    // abcone2threexyz
    // xtwone3four
    // 4nineeightseven2
    // zoneight234
    // 7pqrstsixteen";
    // println!("{}", part2(sample2));

    println!("{}", part2(&input.trim()));
}
