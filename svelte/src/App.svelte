<script lang="ts">
  import './global.css';
  import Grid from './components/Grid.svelte';
  import { GridModel } from './models/GridModel';
  import type { CellModel } from './models/CellModel';

  let grid = new GridModel(20, 20);

  const clear = () => {
    grid.clear();
    grid = grid;
  };

  const step = () => {
    grid.step();
    grid = grid;
  };

  const toggleCell = (cell: CellModel) => {
    console.log(grid.getLiveNeighbors(cell));
    cell.active = !cell.active;
    grid = grid;
  };
</script>

<main>
  <Grid {grid} on:toggle={(e) => toggleCell(e.detail)} />
  <div class="actions">
    <button class="button" data-cy="step" on:click={step}>Step</button>
    <button class="button" data-cy="clear" on:click={clear}>Clear</button>
  </div>
</main>

<style>
  .actions {
    text-align: center;
    margin: 1em 0;
  }
</style>
