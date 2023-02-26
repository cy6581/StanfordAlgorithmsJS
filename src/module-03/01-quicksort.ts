/* 
LEARNINGS
1. Zero-based array indices make it easy to calculate AVG of an array. 
Recall AVG index = (Last + First) /2 
which reduces simply to Floor (Last Index / 2)

2. For in-memory sorting, you want to pass the boundary indexes of left and right

3. Pay attention to where you are logging. For arrays and objects that are mutable, it's very easy to be logging the wrong thing at the wrong point and confusing yourself.

4. Mappings of functions => subroutines.
When you have a function that calls multiple subroutines, take care to check which sub-routine its calling.
E.g. 
qsPivotOnMedian Function 1 
-> Subroutine A
-> Subroutine B 
-> Subroutine C 
Which one is it?

5. Learning is hard by just reading a book. 
Without exercise to challenges you, without other students to share their examples and ask their questions, it's hard to clarify your understanding. 
*/

// PIVOT Functions
export const pivotFirst = (nums: unknown[], left: number, right: number) => {
  return left;
};

export const pivotLast = (nums: unknown[], left: number, right: number) => {
  return right;
};

export const pivotMedianThirds = (nums: unknown[], left: number, right: number) => {
  const first = nums[left];
  const last = nums[right];
  const middle = nums[Math.floor((right + left) / 2)];
  if ((first > last && first < middle) || (first > middle && first < last)) {
    return left;
  } else if ((last > first && last < middle) || (last > middle && last < first)) {
    return right;
  } else {
    return Math.floor((right + left) / 2);
  }
};

// QUICKSORT
export const quickSort = (
  nums: number[],
  left: number,
  right: number,
  numCompare: number,
  choosePivotFunc: Function
): [number[], number] => {
  if (left >= right) {
    return [nums, 0];
  }
  const pivotIndex = choosePivotFunc(nums, left, right);
  swap(nums, left, pivotIndex);
  const newPivot = partition(nums, left, right);
  // add length - 1 to comparisons, i.e. right - left + 1 - 1
  numCompare += right - left;
  const [, leftNumCompare] = quickSort(nums, left, newPivot - 1, 0, choosePivotFunc);
  const [, rightNumCompare] = quickSort(nums, newPivot + 1, right, 0, choosePivotFunc);
  return [nums, numCompare + leftNumCompare + rightNumCompare];
};

// assumes pivot already in left index
const partition = (nums: number[], left: number, right: number) => {
  const pivot = nums[left];
  let l = left + 1;
  for (let r = left + 1; r < right + 1; r++) {
    // recall, the idea is elements left of l are smaller than pivot
    // [2, 1, 3, 4]
    // l is 1, r is idx 1(1), smaller, increase l to 2
    // l is 2, r is idx 2(3), larger, l remains 2
    // l is 2, r is idx 3(4), larger, l still remains 2
    // final: swap idx 0(2) and idx 2-1(1)
    // return idx 1 as the pivot: (1, 2, 3, 4)
    // so you have to move them
    if (nums[r] < pivot) {
      swap(nums, l, r);
      l += 1;
    }
  }
  swap(nums, left, l - 1);
  return l - 1;
};

const swap = (nums: number[], a: number, b: number) => {
  const tmp = nums[a];
  nums[a] = nums[b];
  nums[b] = tmp;
};
