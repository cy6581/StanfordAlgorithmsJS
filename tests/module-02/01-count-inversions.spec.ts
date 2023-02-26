import { expect } from "chai";
import { readFileSync } from "fs";
import * as path from "path";
import { sortAndCountInversions } from "../../src/module-02/01-count-inversions";

describe("Count Inversions", () => {
  it("should count the number of inversions in a small array correctly", () => {
    const [sorted, count] = sortAndCountInversions([1, 3, 5, 2, 4, 6]);
    expect(sorted).to.eql([1, 2, 3, 4, 5, 6]);
    expect(count).to.eql(3);
  });

  it("should count the number of inversions in a super large array correctly", () => {
    const str = readFileSync(path.join(__dirname, "./integer-array.txt"), "utf-8");

    // apparently test file was created on a Windows machine hence the line separator
    // don't forget to convert to number type
    const array = str.split("\r\n").map((i) => +i);
    const [sorted, count] = sortAndCountInversions(array);
    expect(count).to.eql(2407905288);
  });
});
