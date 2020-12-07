'use strict';

/**
 * Prepare the challenge!
 * @param input a string containing the puzzle input
 * @returns an object containing functions that answer part 1 and 2
 */
export async function prepare(input) {
  const countAnswers = (group) => {
    const answers = group.reduce((dict, votes) => {
      for (const question of votes) {
        dict[question] = (dict[question] || 0) + 1;
      }
      return dict;
    }, {});
    answers.votes = group.length;
    return answers;
  };

  const groups = input
    .split(/\r?\n\r?\n/)
    .map((group) => group.split(/\r?\n/).filter(Boolean))
    .map(countAnswers);

  const anyoneAnswered = (group) => Object.keys(group).length - 1;

  const everyoneAnswered = (group) =>
    Object.values(group).filter((count) => count === group.votes).length - 1;

  const sum = (a, b) => a + b;

  // Return a function for parts 1 and 2
  return {
    1: () => groups.map(anyoneAnswered).reduce(sum, 0),
    2: () => groups.map(everyoneAnswered).reduce(sum, 0),
  };
}
