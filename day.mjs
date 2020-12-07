'use strict';

import { join } from 'path';
import { readFile } from 'fs/promises';

// Read command-line parameters
const day = Number(process.argv[2]);
const part = Number(process.argv[3]);

// Validate day
if (!day || day < 1 || day > 25) {
  console.log('Missing day number!');
  console.log('First parameter should be the day number.');
  console.log('It should be a number comprised between 1 and 25.');
  process.exit(1);
}

// Validate puzzle part
if (part !== undefined && (part < 1 || part > 2)) {
  console.log('Invalid part number!');
  console.log('Second parameter should be the part number.');
  console.log('Each day is a challenge made of two parts.');
  console.log('It should be either 1 or 2.');
  console.log('Leave it empty to display the solution for both parts.');
  process.exit(1);
}

/**
 * Find the answer for a puzzle.
 * @param day a number representing the day of the puzzle
 * @param part a number representing the part to answer
 */
async function main(day, part) {
  day = String(day);

  // Load the input data
  const encoding = 'utf8';
  const inputPath = './' + join('day', day, './input');
  const input = await readFile(inputPath, { encoding });

  // Dynamically import the solution
  const answerPath = './' + join('day', day, './answer.mjs');
  const { prepare } = await import(answerPath);
  const answer = await prepare(input);

  // Display the results
  console.log('~~ Advent of code 2020 ~~');
  console.log();
  console.log(`Puzzle solution for day ${day}!`);
  if (!part || part === 1) {
    console.log(`  - Part 1:`, answer[1]());
  }
  if (!part || part === 2) {
    console.log(`  - Part 2:`, answer[2]());
  }
}
// Run the program
main(day, part);
