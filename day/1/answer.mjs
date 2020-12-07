'use strict';

/**
 * Prepare the challenge!
 * @param input a string containing the puzzle input
 * @returns an object containing functions that answer part 1 and 2
 */
export async function prepare(input) {
  // Extract numbers into a TypedArray
  const numbers = Uint16Array.from(
    input.split(/\r?\n/).filter(Boolean).map(Number)
  );
  const { length } = numbers;

  /**
   * Find {depth} numbers that sum to 2020 and return their product.
   * This method works recursively, and should be twice as fast than
   * a solution based on nested `for` loops.
   *
   * @param depth How many numbers (left) to find
   * @param a The current sum in this branch of the recursion
   * @param start the start index; numbers before it have already been tried
   */
  const productOfMatches = (depth, a = 0, start = 0) => {
    if (--depth === 0) {
      // indexOf on TypedArrays is __fast__
      // on regular arrays, it's a bottleneck and should be replaced
      // with a handmade for loop with a strict equality check
      return numbers[numbers.indexOf(2020 - a, start)];
    }
    // No need to iterate on
    const max = length - depth;
    while (start < max) {
      const b = numbers[start];
      const c = productOfMatches(depth, a + b, ++start);
      if (c) {
        return b * c;
      }
    }
  };

  // Return a function for parts 1 and 2
  return {
    1: () => productOfMatches(2),
    2: () => productOfMatches(3),
  };
}
