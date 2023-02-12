/*
GOTCHAS/ Learning Points
1. Very easy to run into MAX_SAFE_INTEGER limit for JS number type. 
My first choice was to use Bignumber.js, which I was familiar with.
Another option is to use BigInt type, which is easier to work with.

2. Careful of order of operations!
10 ** (n/2 * 2) !== 10 ** n/2 * 2

3. Careful of Bignumber toString()'s default behaviour. 
Numbers are serialised like 3.141592653589793238462643383279502884197169399375e+48
Need to adjust the exponential at config.

4. Handling numbers with uneven number of digits
The original algorithm assumes that the two numbers have equal number of digits "n"
Where n must be a power of 2.
Here we implement a modified version of the algorithm that deals with a more general case of odd lengths
https://www.coursera.org/learn/algorithms-divide-conquer/discussions/weeks/1/threads/2KBNhS3uEeeO6xKx1KO_Vg/replies/rzYa8jWUEeeh4wq5Ksh4lg/comments/fQ8_uUCXEeeokA6vEcIGVg?page=2

The modified algorithm splits integers this way 
1. Find the longest length among the two numbers, call it n
2. Ceiling divide n by 2 and round up, call it n/2
3. Split the right side of each number to length n/2, where possible and the remainder to the left side.
If the right side has insufficient digits, set the entire number to the right side, and '0' for the left side.

The final combine step will multiply first term to 10 ** (n/2 * 2), and second term to 10 ** (n/2)

Note
Splitting the numbers as equally as possible is important to ensure that input size reduces
As much as possible with each recursive call, so that the problem size can shrink quickly 
*/

import { BigNumber } from "bignumber.js";

// technically able to handle numbers with a billion digits
BigNumber.config({ EXPONENTIAL_AT: 1e9 });

//
// Normal recursive algorithm, 4 recursive calls
//
export const recursiveMultiply = (x: bigint, y: bigint): bigint => {
  const n = Math.max(x.toString().length, y.toString().length);
  const nDivideTwo = Math.ceil(n / 2);
  // base case
  if (n === 1) {
    return x * y;
  }
  // recursive case
  const [a, b] = split(x.toString(), nDivideTwo).map((e) => BigInt(e));
  const [c, d] = split(y.toString(), nDivideTwo).map((e) => BigInt(e));
  const ac = recursiveMultiply(a, c);
  const ad = recursiveMultiply(a, d);
  const bc = recursiveMultiply(b, c);
  const bd = recursiveMultiply(b, d);

  return 10n ** BigInt(nDivideTwo * 2) * ac + 10n ** BigInt(nDivideTwo) * (ad + bc) + bd;
};

//
// Karatsuba Algorithm, 3 recursive calls
//
export const karatsuba = (x: BigNumber, y: BigNumber): BigNumber => {
  const n = Math.max(x.toString().length, y.toString().length);
  const nDivideTwo = Math.ceil(n / 2);
  // base case
  if (n === 1) {
    return x.multipliedBy(y);
  }
  // worked example is 3141 * 2718
  const [a, b] = split(x.toString(), nDivideTwo).map((e) => BigNumber(e)); // 31, 41
  const [c, d] = split(y.toString(), nDivideTwo).map((e) => BigNumber(e)); // 27, 18
  const p = a.plus(b); // 72
  const q = c.plus(d); // 45
  const ac = karatsuba(a, c); // 837
  const bd = karatsuba(b, d); // 738
  const pq = karatsuba(p, q); // 3240
  const adbc = pq.minus(ac).minus(bd); // 1665

  return BigNumber(10 ** (nDivideTwo * 2))
    .multipliedBy(ac)
    .plus(BigNumber(10 ** nDivideTwo).multipliedBy(adbc))
    .plus(bd);
};

const split = (str: string, splitLength: number): [string, string] => {
  const a = str.length > splitLength ? str.slice(0, -splitLength) : "0";
  const b = str.slice(-splitLength);
  return [a, b];
};
