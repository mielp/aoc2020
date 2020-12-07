'use strict';

/**
 * Prepare the challenge!
 * @param input a string containing the puzzle input
 * @returns an object containing functions that answer part 1 and 2
 */
export async function prepare(input) {
  const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  const between = (min, max) => (x) => x >= min && x <= max;

  const addField = (obj, [key, value]) => {
    obj[key] = value;
    return obj;
  };

  const getPassport = (str) =>
    str
      .split(/\s+/)
      .filter(Boolean)
      .map((field) => field.split(':'))
      .reduce(addField, {});

  const passports = input.split(/\r?\n\r?\n/).map(getPassport);

  // Each field has its own validation rules
  const fields = {
    byr: (f) => between(1920, 2002)(Number(f)),
    iyr: (f) => between(2010, 2020)(Number(f)),
    eyr: (f) => between(2020, 2030)(Number(f)),
    hgt: (f) => {
      let [_, height, unit] = /^(\d+)(cm|in)$/.exec(f) || [];
      height = Number(height);
      return unit === 'cm'
        ? between(150, 193)(height)
        : between(59, 76)(height);
    },
    hcl: (f) => /^#[0-9a-f]{6}$/.test(f),
    ecl: (f) => eyeColors.indexOf(f) !== -1,
    pid: (f) => /^\d{9}$/.test(f),
  };

  const fieldKeys = Object.keys(fields);
  const fieldEntries = Object.entries(fields);
  const isPresent = (p) => fieldKeys.every((key) => p[key]);
  const isValid = (p) =>
    fieldEntries.every(([key, test]) => p[key] && test(p[key]));

  // Return a function for parts 1 and 2
  return {
    1: () => passports.filter(isPresent).length,
    2: () => passports.filter(isValid).length,
  };
}
