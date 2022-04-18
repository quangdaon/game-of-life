<script lang="ts">
  import type { CellModel } from '../models/CellModel';

  export let cell: CellModel;

  $: coordinates = `${cell.x}, ${cell.y}`;
</script>

<div class="cell" title={coordinates} />

<style>
  .cell {
    aspect-ratio: 1;
    background: var(--color-text);
    border-radius: 2px;
    opacity: 0.2;
  }
</style>