<script lang="ts">
  import type { GridModel } from '../models/GridModel';
  import Cell from './Cell.svelte';

  export let grid: GridModel;
</script>

<div class="grid" style="--grid-columns: {grid.columns}">
  {#each grid.cells as cell}
    <Cell {cell} />
  {/each}
</div>

<style>
  .grid {
    width: 25vw;
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: 3px;
    margin: auto;
  }
</style>
