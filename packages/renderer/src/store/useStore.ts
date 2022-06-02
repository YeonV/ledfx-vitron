import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { combine } from 'zustand/middleware';
import { storeGeneral } from './ui/storeGeneral';
import { storeFeatures } from './ui/storeFeatures';
import { storeTours } from './ui/storeTours';
import { storeUI } from './ui/storeUI';
import { storeDialogs } from './ui/storeDialogs';
import { storeSpotify } from './ui/storeSpotify';
import { storeWebAudio } from './ui/storeWebAudio';
import { storeYoutube } from './ui/storeYoutube';
import { storeDevices } from './api/storeDevices';
import { storeVirtuals } from './api/storeVirtuals';
import { storeScenes } from './api/storeScenes';
import { storeIntegrations } from './api/storeIntegrations';
import { storePresets } from './api/storePresets';
import { storeConfig } from './api/storeConfig';
import { storeActions } from './api/storeActions';

export const useStore = create(
  devtools(
    combine(
      {
        hackedBy: 'Blade',
      },
      (set:any)=> ({
        general: storeGeneral(set),
        ui: storeUI(set),
        tours: storeTours(set),
        dialogs: storeDialogs(set),
        features: storeFeatures(set),
        webaudio: storeWebAudio(set),
        spotify: storeSpotify(set),
        youtube: storeYoutube(set),
        ...storeDevices(set),
        ...storeVirtuals(set),
        ...storeScenes(set),
        ...storeIntegrations(set),
        ...storePresets(set),
        ...storeConfig(set),
        ...storeActions(set),
      })
    )
  )
);
