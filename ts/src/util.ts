import { readFileSync } from "fs";
import { parse } from "path";

export function clean(data: string) {
  return data
    .trim()
    .split("\n")
    .map((l) => l.trim());
}

export function load(path: string) {
  return clean(readFileSync(`../inputs/${parse(path).name}`, "utf8"));
}
