<script lang="ts">
  import './global.css';
  import Grid from './components/Grid.svelte';
  import { GridModel } from './models/GridModel';

  const grid = new GridModel(20, 20);
</script>

<main>
  <Grid {grid} />
</main>
