'use strict';

/**
 * Prepare the challenge!
 * @param input a string containing the puzzle input
 * @returns an object containing functions that answer part 1 and 2
 */
export async function prepare(input) {
  const childrenExp = /(\d+) ([a-z ]+) bag/;

  const getBag = (line) => {
    const [color, contents] = line.split(' bags contain ');
    const children = {};
    if (!contents.startsWith('no other')) {
      contents.split(', ').forEach((content) => {
        const [_, n, color] = childrenExp.exec(content);
        children[color] = Number(n);
      });
    }
    return { [color]: children };
  };

  const bags = input
    .split(/\r?\n/)
    .filter(Boolean)
    .map(getBag)
    .reduce((a, b) => Object.assign(a, b), {});

  const findParents = (color) => {
    const visited = {};
    const nextParents = (color) => {
      const parents = [];
      for (const [name, children] of Object.entries(bags)) {
        if (children[color] && !visited[name]) {
          visited[name] = true;
          parents.push(name, ...nextParents(name));
        }
      }
      return parents;
    };
    return nextParents(color);
  };

  const countChildren = ([color, amount]) => {
    const children = Object.entries(bags[color])
      .map(countChildren)
      .reduce((a, b) => a + b, 0);
    return amount * (1 + children);
  };

  // Return a function for parts 1 and 2
  return {
    1: () => findParents('shiny gold').length,
    2: () => countChildren(['shiny gold', 1]) - 1,
  };
}
