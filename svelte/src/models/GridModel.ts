import { CellModel } from './CellModel';

export class GridModel {
  public cells = [];

  constructor(public columns: number, public rows: number) {
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
}
