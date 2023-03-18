/* 
GOTCHAS/ Learning points
1. Reminder, this is actually implementing MergeSort
*/

export const sortAndCountInversions = (input: number[]): [number[], number] => {
  // base case
  if (input.length === 0 || input.length === 1) {
    return [input, 0];
  }
  // recursive case
  const leftHalfInput = input.slice(0, Math.floor(input.length / 2));
  const [leftHalf, leftInversions] = sortAndCountInversions(leftHalfInput);

  const rightHalfInput = input.slice(Math.floor(input.length / 2));
  const [rightHalf, rightInversions] = sortAndCountInversions(rightHalfInput);

  const [merged, splitInversions] = mergeAndCountSplitInversions(leftHalf, rightHalf);
  return [merged, leftInversions + rightInversions + splitInversions];
};

const mergeAndCountSplitInversions = (
  leftHalf: number[],
  rightHalf: number[]
): [number[], number] => {
  let merged = [];
  let splitInversions = 0;

  let i = 0;
  let j = 0;

  for (let k = 0; k < leftHalf.length + rightHalf.length; k++) {
    if (i > leftHalf.length - 1) {
      // means done, copy remaining of right half
      merged.push(...rightHalf.slice(j));
      break;
    }
    if (j > rightHalf.length - 1) {
      merged.push(...leftHalf.slice(i));
      break;
    }

    if (leftHalf[i] < rightHalf[j]) {
      // no split inversions
      merged[k] = leftHalf[i];
      i += 1;
    } else {
      // split inversions detected
      merged[k] = rightHalf[j];
      // length of remaining elements in leftHalf
      splitInversions += leftHalf.length - i;
      j += 1;
    }
  }

  return [merged, splitInversions];
};
