<script lang="ts">
  import type { GridModel } from '../models/GridModel';
  import Cell from './Cell.svelte';

  export let grid: GridModel;
</script>

<div class="grid">
  {#each grid.cells as cell}
    <Cell {cell} />
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(20, 1em);
  }
</style>
