import { CellModel } from './CellModel';

export class GridModel {
  public cells = [];

  constructor(public rows: number, public columns: number) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        this.cells.push(new CellModel(j, i));
      }
    }
  }
}
