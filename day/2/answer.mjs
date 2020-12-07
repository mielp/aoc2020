'use strict';

/**
 * Prepare the challenge!
 * @param input a string containing the puzzle input
 * @returns an object containing functions that answer part 1 and 2
 */
export async function prepare(input) {
  /** Easy parsing of the input strings */
  const entryRegex = /^(\d+)-(\d+) ([a-z]): (.+)$/;

  /** Transform one line into an entry object */
  const readEntry = (line) => {
    const [_, a, b, letter, password] = entryRegex.exec(line);
    return { password, letter, min: Number(a), max: Number(b) };
  };

  /**
   * Check whether the password has between min and max
   * occurrences of the given letter.
   */
  const isValid1 = ({ password, letter, min, max }) => {
    const { length } = password.match(new RegExp(letter, 'g')) || [];
    return length >= min && length <= max;
  };

  /**
   * Check whether the given letter is present exactly
   * once at the given positions (min and max) in the password.
   */
  const isValid2 = ({ password, letter, min, max }) => {
    const l1 = password[min - 1] === letter;
    const l2 = password[max - 1] === letter;
    return (l1 && !l2) || (l2 && !l1);
  };

  // Transform each line into an entry object
  const entries = input.split(/\r?\n/).filter(Boolean).map(readEntry);

  // Return a function for parts 1 and 2
  return {
    1: () => entries.filter(isValid1).length,
    2: () => entries.filter(isValid2).length,
  };
}
