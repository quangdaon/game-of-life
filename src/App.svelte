<script lang="ts">
  import './global.css';
  import Grid from './components/Grid.svelte';
  import { GridModel } from './models/GridModel';
  import type { CellModel } from './models/CellModel';
  import { createPreset } from './services/presets';
  import PresetPicker from './components/PresetPicker.svelte';
  import type { Preset } from './models/Preset';

  let grid = new GridModel(30);
  let playing = false;
  let presetting = false;

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

  const savePreset = () => {
    const name = prompt('Preset Name');
    if (name) createPreset(name, grid);
  };

  const loadPreset = (preset: Preset) => {
    grid.loadPreset(preset.cells);
    grid = grid;
    presetting = false;
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
    <button class="button" data-cy="step" on:click={step} disabled={playing}>
      Step
    </button>
    <button class="button" data-cy="clear" on:click={clear} disabled={playing}>
      Clear
    </button>
  </div>
  <div class="actions actions-presets">
    <button
      class="button"
      data-cy="preset:load"
      on:click={() => (presetting = true)}
      disabled={playing}
    >
      Load Preset
    </button>
    <button
      class="button"
      data-cy="preset:save"
      on:click={savePreset}
      disabled={playing}
    >
      Save Preset
    </button>
  </div>
</main>

{#if presetting}
  <PresetPicker
    on:cancel={() => (presetting = false)}
    on:select={(evt) => loadPreset(evt.detail)}
  />
{/if}

<style>
  .actions {
    text-align: center;
    margin: 1em 0;
  }
</style>
