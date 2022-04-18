<script lang="ts">
  import './global.css';
  import Grid from './components/Grid.svelte';
  import { GridModel } from './models/GridModel';

  const grid = new GridModel(20, 20);
</script>

<main>
  <Grid {grid} />
  <div class="actions">
    <button class="button">Step</button>
    <button class="button">Clear</button>
  </div>
</main>

<style>
  .actions {
    text-align: center;
    margin: 1em 0;
  }
</style>