<script lang="ts">
  import type { GridModel } from '../models/GridModel';
  import Cell from './Cell.svelte';

  export let grid: GridModel;
</script>

<div class="grid" style="--grid-columns: {grid.columns}">
  {#each grid.cells as cell}
    <Cell {cell} on:toggle />
  {/each}
</div>

<style>
  .grid {
    width: 30vw;
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: 1px;
    margin: auto;
  }
</style>
