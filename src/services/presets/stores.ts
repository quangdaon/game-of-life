import { readable, writable } from 'svelte/store';
import type { Preset } from '../../models/Preset';

const localStorageKey = 'GAME_OF_LIFE_PRESETS';

export const customPresets = writable<Preset[]>(
  JSON.parse(window.localStorage.getItem(localStorageKey)) ?? []
);

customPresets.subscribe((presets) => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(presets));
});

export const builtInPresets = readable<Preset[]>([], (set) => {
  const jsons = import.meta.glob<Preset>('/src/data/presets/*.json');
  const modules = Object.values(jsons);
  const promises = modules.map((getJson) => getJson());

  Promise.all(promises).then(set);
});
