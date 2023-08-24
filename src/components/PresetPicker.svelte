<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import {
    builtInPresets,
    customPresets,
    deletePreset,
  } from '../services/presets';
  import PresetPickerSublist from './PresetPickerSublist.svelte';

  const dispatch = createEventDispatcher();
</script>

<div class="presets-overlay" data-cy="preset:picker">
  <div class="presets-picker">
    <div class="presets-list">
      {#if $builtInPresets.length}
        <PresetPickerSublist
          title="Built-In Presets"
          presets={$builtInPresets}
          on:select
        />
      {/if}
      {#if $customPresets.length}
        <PresetPickerSublist
          title="Saved Presets"
          presets={$customPresets}
          deletable
          on:select
          on:delete={(evt) => deletePreset(evt.detail)}
        />
      {/if}
    </div>
    <div class="actions">
      <button
        class="button"
        data-cy="preset:cancel"
        on:click={() => dispatch('cancel')}
      >
        Cancel
      </button>
    </div>
  </div>
</div>

<style>
  .presets-overlay {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
  }

  .presets-picker {
    width: calc(100vw - 2em);
    background-color: var(--color-background);
    margin: auto;
  }

  .actions {
    margin-top: 1em;
  }

  @media screen and (min-width: 600px) {
    .presets-picker {
      width: 60vw;
    }
  }

  @media screen and (min-width: 1080px) {
    .presets-picker {
      width: 20vw;
    }
  }
</style>
