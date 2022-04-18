<script lang="ts">
  import './global.css';
  import Grid from './components/Grid.svelte';
  import { GridModel } from './models/GridModel';
  import type { CellModel } from './models/CellModel';

  let grid = new GridModel(20, 20);
  let playing = false;

  const clear = () => {
    grid.clear();
    grid = grid;
  };

  const step = () => {
    grid.step();
    grid = grid;
  };

  const toggleCell = (cell: CellModel) => {
    if (playing) return;
    cell.active = !cell.active;
    grid = grid;
  };

  let timestampChecked = 0;
  let framerate = 30;

  function animationLoop(ms: number) {
    if (playing) {
      const prevState = grid.getState();
      const timeout = 1000 / framerate;
      const diff = ms - timestampChecked;

      if (diff >= timeout) {
        timestampChecked = ms;
        step();

        const newState = grid.getState();

        let changed = false;
        for (const i in newState) {
          if (prevState[i] !== newState[i]) {
            changed = true;
            break;
          }
        }

        if (!changed) playing = false;
      }
    }
    requestAnimationFrame(animationLoop);
  }
  requestAnimationFrame(animationLoop);
</script>

<main>
  <Grid {grid} on:toggle={(e) => toggleCell(e.detail)} />
  <div class="actions">
    <button class="button" data-cy="play" on:click={() => (playing = !playing)}>
      {playing ? 'Pause' : 'Play'}
    </button>
    <button class="button" data-cy="step" on:click={step} disabled={playing}
      >Step</button
    >
    <button class="button" data-cy="clear" on:click={clear} disabled={playing}
      >Clear</button
    >
  </div>
</main>

<style>
  .actions {
    text-align: center;
    margin: 1em 0;
  }
</style>
