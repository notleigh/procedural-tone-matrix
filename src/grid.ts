const cells = Array.from(document.getElementsByClassName('cell'));

export type GridCell = {
  life: number;
  color: number;
};

export const updateGrid = (grid: GridCell[]) => {
  grid.forEach((element, index) => {
    const cell = cells[index] as HTMLElement;
    element.life
      ? cell.classList.add('active')
      : cell.classList.remove('active');
    cell.style.backgroundColor = element.life ? element.color.toString() : '';
  });
};

export const highlightGrid = (
  grid: GridCell[],
  step: number,
  steps: number,
) => {
  const highlightedCells: Element[] = [];

  for (let i = 0; i < steps; i++) {
    const cellIndex = step + i * steps;
    if (grid[cellIndex].life) {
      cells[cellIndex].classList.add('highlighted');
      highlightedCells.push(cells[cellIndex]);
    }
  }

  setTimeout(
    () =>
      highlightedCells.forEach((cell) => cell.classList.remove('highlighted')),
    125,
  );
};
