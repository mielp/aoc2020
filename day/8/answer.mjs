'use strict';

/**
 * Prepare the challenge!
 * @param input a string containing the puzzle input
 * @returns an object containing functions that answer part 1 and 2
 */
export async function prepare(input) {
  const getProgram = (str, line) => {
    const [cmd, argument] = str.split(' ');
    return { line, cmd, arg: Number(argument) };
  };
  const program = input.split(/\r?\n/).filter(Boolean).map(getProgram);

  /**
   * Run a program in a pseudo-assembly with 3 instructions (nop, jmp & acc),
   * and return the value of the accumulator when the program exits.
   * The program exits when an infinite loop is detected (failure),
   * or when it reaches the last instruction (success).
   *
   * @param program A sequence of instructions
   * @param debug true to enable automatic debugging; it will
   *   attempt to fix infinite loops by replacing a single
   *   jmp instruction by a nop instruction, or vice-versa.
   */
  const run = (program, debug) => {
    // Cleanup previous run if any
    program.forEach((ins) => (ins.visited = false));

    // Ability to unwind history
    let max = Infinity;
    const history = [];
    const unwind = (history) => {
      max = Math.min(max, history.length);
      while (--max > 0 && ['jmp', 'nop'].indexOf(history[max].cmd) === -1);
      history[max].cmd = history[max].cmd === 'jmp' ? 'nop' : 'jmp';
      return history[max];
    };

    let acc = 0;
    for (let line = 0; line < program.length; ) {
      if (program[line].visited) {
        if (debug) ({ acc, line } = unwind(history));
        else return acc;
      }
      // evaluate the instruction
      const instruction = program[line];
      const { cmd, arg } = instruction;
      acc += cmd === 'acc' ? arg : 0;
      line += cmd === 'jmp' ? arg : 1;
      // store the state
      instruction.visited = true;
      instruction.acc = acc;
      history.push(instruction);
    }
    console.log('Terminated');
    return acc;
  };

  // Return a function for parts 1 and 2
  return {
    1: () => run(program, false),
    2: () => run(program, true),
  };
}
