'use strict';

/**
 * Prepare the challenge!
 * @param input a string containing the puzzle input
 * @returns an object containing functions that answer part 1 and 2
 */
export async function prepare(input) {
  // Transform each line into an entry object
  const lines = input.split(/\r?\n/).filter(Boolean);

  const slope = ([right, down]) => {
    let trees = 0;
    let left = 0;
    for (let l = 1; l < lines.length; l += down) {
      const line = lines[l];
      left += right;
      if (line[left % line.length] === '#') {
        ++trees;
      }
    }
    return trees;
  };

  const slopes = (...pairs) =>
    pairs.reduce((product, pair) => product * slope(pair), 1);

  // Return a function for parts 1 and 2
  return {
    1: () => slope([3, 1]),
    2: () => slopes([1, 1], [3, 1], [5, 1], [7, 1], [1, 2]),
  };
}
