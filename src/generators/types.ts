import { GridCell } from 'grid';

export type Generator = (
  notes: number,
  steps: number,
) => {
  grid: GridCell[];
  next: () => void;
};
