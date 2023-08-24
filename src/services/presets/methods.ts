import type { CellModel } from '../../models/CellModel';
import type { GridModel } from '../../models/GridModel';
import type { Preset } from '../../models/Preset';
import { customPresets } from './stores';

export const getCellCoordinates = (cells: CellModel[]): [number, number][] =>
  cells.filter((c) => c.active).map((c) => [c.x, c.y]);

export const createPreset = (name: string, grid: GridModel): Preset => {
  const preset: Preset = {
    name,
    cells: getCellCoordinates(grid.cells),
  };

  customPresets.update((e) => [...e, preset]);

  return preset;
};

export const deletePreset = (preset: Preset) => {
  customPresets.update((p) => p.filter((e) => e !== preset));
};
