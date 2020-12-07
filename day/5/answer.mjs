'use strict';

/**
 * Prepare the challenge!
 * @param input a string containing the puzzle input
 * @returns an object containing functions that answer part 1 and 2
 */
export async function prepare(input) {
  /**
   * Parses a string as a sequence of LEFT/RIGHT instructions,
   * in order to find the target number in the [min, max] interval.
   *
   * @param str The input string
   * @param min The lower bound of the interval
   * @param max The upper bound of the interval
   * @param left The character recognized as LEFT
   * @param right The character recognized as RIGHT
   *
   * @example dichotomy('LLRLRLL', 0, 127, 'L', 'R') // 20
   */
  const dichotomy = (str, min, max, left, right) => {
    for (const char of str) {
      if (char === left) {
        max -= Math.round((max - min) / 2);
      } else if (char === right) {
        min += Math.round((max - min) / 2);
      }
    }
    return min;
  };

  /**
   * Transform an input string (a seat code description)
   * into a seat id. The first 7 characters of the input
   * describe the row position (from 0 to 127), and the
   * last 3 characters describe the seat position (0 to 7).
   * @param str The seat code description.
   * @returns The seat identifier (row * 8 + seat).
   */
  const getSeatId = (str) => {
    const rowCode = str.slice(0, 7);
    const seatCode = str.slice(7, 10);
    const row = dichotomy(rowCode, 0, 127, 'F', 'B');
    const seat = dichotomy(seatCode, 0, 7, 'L', 'R');
    return row * 8 + seat;
  };

  // Read the input into a list of seat IDs, and sort descending
  const seats = input
    .split(/\r?\n/)
    .filter(Boolean)
    .map(getSeatId)
    .sort((a, b) => b - a);

  // Highest seat ID is the first seat
  const highest = seats[0];
  // Easy to find an empty seat between two consecutive seats
  const empty = seats.find((seat, i) => seats[i + 1] === seat - 2) - 1;

  // Return a function for parts 1 and 2
  return {
    1: () => highest,
    2: () => empty,
  };
}
