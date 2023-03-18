import { expect } from "chai";
import { readFileSync } from "fs";
import * as path from "path";
import { kargerMincut } from "../../src/module-04/01-karger-min-cut";

describe("Karger Min Cut", () => {
  it("should return the min cut of the provided graph", () => {
    const input = readFileSync(path.join(__dirname, "./graph-adjacency-list.txt"), "utf-8");
    const inputLines = input.split("\r\n"); // array of lines

    const graph: Record<string, string[]> = {};
    for (const line of inputLines) {
      const arr = line.split("\t");
      const vertexNum = arr[0];
      // remove the first and last elements of the arr
      // first is the pointer
      // last is empty string
      arr.shift();
      arr.pop();
      graph[vertexNum] = arr;
    }

    // repeat sufficient times
    // high probability that you have got the correct answer
    let min = Infinity;
    for (let i = 0; i < 20; i++) {
      const graphClone = JSON.parse(JSON.stringify(graph));
      const ithResult = kargerMincut(graphClone);
      console.log("min", ithResult);
      min = Math.min(min, ithResult);
    }

    expect(min).to.be.eql(17);
  }).timeout(5000);
});
