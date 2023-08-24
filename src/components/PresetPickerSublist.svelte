<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Preset } from '../models/Preset';
  const dispatch = createEventDispatcher();

  export let title: string;
  export let presets: Preset[];
  export let deletable = false;
</script>

<div class="presets-sublist">
  <h3>{title}</h3>
  <div class="presets-container">
    <div class="presets-options">
      {#each presets as preset}
        <div class="presets-option">
          <button
            class="presets-select"
            data-cy="preset:select({preset.name})"
            on:click={() => dispatch('select', preset)}
          >
            {preset.name}
          </button>
          {#if deletable}
            <button
              class="presets-delete"
              data-cy="preset:delete({preset.name})"
              on:click={() => dispatch('delete', preset)}
            >
              &times;
            </button>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  h3 {
    margin: 0;
    padding: 0.5em;
  }

  .presets-options {
    max-height: 28vh;
    overflow-y: auto;
  }

  .presets-container {
    position: relative;
  }

  .presets-option {
    display: flex;
  }

  .presets-select,
  .presets-delete {
    display: block;
    background: var(--color-primary);
    border: none;
    border-radius: 0;
    cursor: pointer;
    color: inherit;
  }

  .presets-select:hover,
  .presets-delete:hover {
    background: var(--color-secondary);
  }

  .presets-select {
    width: 100%;
    text-align: left;
  }
</style>
