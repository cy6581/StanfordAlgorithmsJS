import BigNumber from "bignumber.js";
import { expect } from "chai";
import { karatsuba, recursiveMultiply } from "../src/module-01/01-karatsuba";

BigNumber.config({ EXPONENTIAL_AT: 1e9 });

describe("Karatusba Algorithm", () => {
  it("should multiply numbers below MAX_SAFE_INTEGER correctly", () => {
    expect(karatsuba(BigNumber("3141"), BigNumber("2718")).toString()).to.eql("8537238");
    expect(karatsuba(BigNumber("20"), BigNumber("40")).toString()).to.eql("800");
  });

  it("should multiply numbers above MAX_SAFE_INTEGER correctly", () => {
    expect(
      karatsuba(
        BigNumber("3141592653589793238462643383279502884197169399375105820974944592"),
        BigNumber("2718281828459045235360287471352662497757247093699959574966967627")
      ).toString()
    ).to.eql(
      "8539734222673567065463550869546574495034888535765114961879601127067743044893204848617875072216249073013374895871952806582723184"
    );
  });
});

describe("Recurisve Multiply", () => {
  it("should multiply numbers below MAX_SAFE_INTEGER correctly", () => {
    expect(recursiveMultiply(BigInt("3141"), BigInt("2718")).toString()).to.eql("8537238");
    expect(recursiveMultiply(BigInt("20"), BigInt("40")).toString()).to.eql("800");
  });

  it("should multiply numbers above MAX_SAFE_INTEGER correctly", () => {
    expect(
      recursiveMultiply(
        BigInt("3141592653589793238462643383279502884197169399375105820974944592"),
        BigInt("2718281828459045235360287471352662497757247093699959574966967627")
      ).toString()
    ).to.eql(
      "8539734222673567065463550869546574495034888535765114961879601127067743044893204848617875072216249073013374895871952806582723184"
    );
  });
});
