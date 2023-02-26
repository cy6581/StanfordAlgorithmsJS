import { expect } from "chai";
import { readFileSync } from "fs";
import * as path from "path";
import {
  pivotFirst,
  pivotLast,
  pivotMedianThirds,
  quickSort,
} from "../../src/module-03/01-quicksort";

/*
CREDIT various folks who provided test cases 
https://github.com/ds17f/stanford-algs/tree/master/testCases/course1/assignment3Quicksort
https://www.coursera.org/learn/algorithms-divide-conquer/discussions/forums/CXluNHblEeaK6BLwFglc1Q/threads/fG_c7gxREeiFUgpNZCwT4A
*/
describe.only("QuickSort Functions", () => {
  it("quickSort should sort array and return correct number of comparisons", () => {
    let arr = [3, 2, 1, 4, 5];
    let res = [1, 2, 3, 4, 5];
    expect(quickSort([...arr], 0, arr.length - 1, 0, pivotFirst)).to.eql([res, 6]);
    expect(quickSort([...arr], 0, arr.length - 1, 0, pivotLast)).to.eql([res, 10]);
    expect(quickSort([...arr], 0, arr.length - 1, 0, pivotMedianThirds)).to.eql([res, 6]);

    arr = [10, 6, 3, 7, 9, 2, 5, 8, 1, 4];
    res = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(quickSort([...arr], 0, arr.length - 1, 0, pivotFirst)).to.eql([res, 28]);
    expect(quickSort([...arr], 0, arr.length - 1, 0, pivotLast)).to.eql([res, 22]);
    expect(quickSort([...arr], 0, arr.length - 1, 0, pivotMedianThirds)).to.eql([res, 22]);

    arr = [2, 20, 1, 15, 3, 11, 13, 6, 16, 10, 19, 5, 4, 9, 8, 14, 18, 17, 7, 12];
    res = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    expect(quickSort([...arr], 0, arr.length - 1, 0, pivotFirst)).to.eql([res, 81]);
    expect(quickSort([...arr], 0, arr.length - 1, 0, pivotLast)).to.eql([res, 69]);
    expect(quickSort([...arr], 0, arr.length - 1, 0, pivotMedianThirds)).to.eql([res, 55]);

    const input = readFileSync(path.join(__dirname, "./integers-unsorted.txt"), "utf-8");
    arr = input.split("\r\n").map((i) => +i);
    expect(quickSort([...arr], 0, arr.length - 1, 0, pivotFirst)[1]).to.eql(162085);
    expect(quickSort([...arr], 0, arr.length - 1, 0, pivotLast)[1]).to.eql(164123);
    expect(quickSort([...arr], 0, arr.length - 1, 0, pivotMedianThirds)).to.eql([
      arr.sort((a, b) => a - b),
      138382,
    ]);
  });

  it("choosePivotMedianThirds should return the correct pivot index", () => {
    let array = [1, 2, 3];
    expect(pivotMedianThirds(array, 0, array.length - 1)).to.eql(1);
    array = [8, 2, 4, 5, 7, 1];
    expect(pivotMedianThirds(array, 0, array.length - 1)).to.eql(2);
    array = [5, 4, 3, 2, 1];
    expect(pivotMedianThirds(array, 0, array.length - 1)).to.eql(2);
    array = [3, 4, 5, 2, 1];
    expect(pivotMedianThirds(array, 0, array.length - 1)).to.eql(0);
    array = [7, 4, 1, 3, 6, 2, 5, 9, 8];
    expect(pivotMedianThirds(array, 0, array.length - 1)).to.eql(0);
    expect(pivotMedianThirds(array, 1, 6)).to.eql(1);
    array = [6, 5];
    expect(pivotMedianThirds(array, 0, array.length - 1)).to.eql(0);
    array = [20, 19];
    expect(pivotMedianThirds(array, 0, array.length - 1)).to.eql(0);
  });
});
