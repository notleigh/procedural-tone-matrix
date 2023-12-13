import seedrandom from 'seedrandom';

import { Generator } from './types';

export const cullOverTime: Generator = (notes: number, steps: number) => {
  const grid = Array(notes * steps);
  for (let i = 0; i < notes * steps; i++) {
    grid[i] = { life: 0, color: 0 };
  }
  const newToAdd: number[] = [];

  const next = () => {
    for (let i = 0; i < notes * steps; i++) {
      if (grid[i].life > 0) {
        grid[i].life = grid[i].life - 1;
      }
    }
    if (newToAdd.length > 0) {
      const index = newToAdd.pop() as number;
      grid[index].life = steps * 10;
    }
  };

  let keySequence: string[] = [];

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    const key = event.key;

    // Ignore non-alphanumeric keys
    if (/^[a-zA-Z0-9]$/.test(key)) {
      keySequence.push(key);
    }

    if (event.key === 'Enter') {
      const sequence = keySequence.join('');
      console.log(`Sequence entered: ${sequence}`);

      keySequence = [];

      const rng = seedrandom(sequence);
      const color = `hsl(${Math.floor(rng() * 360)}, 100%, 50%)`;

      for (let i = 0; i < 10; i++) {
        const index = Math.floor(rng() * notes * steps);
        //newToAdd.push(index);
        grid[index].life = steps * 10 - i * 3;
        grid[index].color = color;
      }
      newToAdd.sort((a, b) => b - a);
    }
  });

  return { grid, next };
};
