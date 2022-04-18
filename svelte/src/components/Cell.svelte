<script lang="ts">
  import type { CellModel } from '../models/CellModel';

  export let cell: CellModel;

  $: coordinates = `${cell.x}, ${cell.y}`;
</script>

<div class="cell" title={coordinates} />

<style>
  .cell {
    border: 1px solid black;
    aspect-ratio: 1;
  }
</style>