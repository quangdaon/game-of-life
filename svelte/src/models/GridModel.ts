import { CellModel } from './CellModel';

export class GridModel {
  public cells: CellModel[] = [];

  constructor(public columns: number, public rows: number = columns) {
    for (let j = 0; j < columns; j++) {
      for (let i = 0; i < rows; i++) {
        this.cells.push(new CellModel(i, j));
      }
    }
  }

  clear() {
    for (const c of this.cells) c.active = false;
    this.cells = [...this.cells];
  }

  step() {
    const clone: CellModel[] = [];

    for (const cell of this.cells) {
      const live = this.getLiveNeighbors(cell);
      const clonedCell = new CellModel(cell.x, cell.y);
      let newState = cell.active;

      if (cell.active) {
        if (live < 2 || live > 3) newState = false;
      } else {
        if (live === 3) newState = true;
      }

      clonedCell.active = newState;

      clone.push(clonedCell);
    }

    this.cells = clone;
  }

  getCell(x: number, y: number) {
    const i = y * this.columns + x;
    const cell = this.cells[i];

    if (x < 0 || x > this.columns - 1 || y < 0 || y > this.rows - 1)
      return null;

    if (cell.x !== x || cell.y !== y) {
      throw new Error('Catastrophe disaster occurred.');
    }

    return cell;
  }

  getState() {
    return this.cells.map(e => e.active);
  }

  getLiveNeighbors(cell: CellModel): number {
    let count = 0;
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        if (xOffset === 0 && yOffset === 0) continue;

        const x = cell.x + xOffset;
        const y = cell.y + yOffset;

        const neighbor = this.getCell(x, y);

        count += neighbor?.active ? 1 : 0;
      }
    }

    return count;
  }
}
