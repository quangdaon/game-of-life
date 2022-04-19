<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import type { CellModel } from '../models/CellModel';
	const dispatch = createEventDispatcher<{toggle: CellModel}>();

  export let cell: CellModel;

  const toggle = () => dispatch('toggle', cell);

  $: coordinates = `${cell.x}, ${cell.y}`;
</script>

<button
  on:click={toggle}
  class="cell"
  class:active={cell.active}
  data-x={cell.x}
  data-y={cell.y}
  title={coordinates}
/>

<style>
  .cell {
    aspect-ratio: 1;
    background: var(--color-text);
    border-radius: 0;
    opacity: 0.2;
    padding: 0;
    margin: 0;
    border: none;
    cursor: pointer;
  }

  .cell:active {
    opacity: 0.15;
  }

  .cell.active {
    opacity: 1;
  }
</style>
