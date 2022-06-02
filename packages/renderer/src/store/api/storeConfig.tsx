import produce from 'immer';
import { Ledfx } from '@/api/ledfx';

export const storeConfig = (set: any) => ({
  schemas: {},
  getSchemas: async () => {
    const resp = await Ledfx('/api/schema');
    if (resp) {
      set(produce((s:any) => {s.schemas = resp;}),false,'gotSchemas');
    }
  },

  config: {},
  getSystemConfig: async () => {
    const resp = await Ledfx('/api/config');
    if (resp && resp.host) {
      set(
        produce((state: any) => {
          state.config = {
            ...resp,
            ...{
              ledfx_presets: undefined,
              devices: undefined,
              virtuals: undefined,
              integrations: undefined,
              scenes: undefined,
            },
          };
        }),
        false,
        'api/gotSystemConfig'
      )
    } else {
      set(
        produce((state: any) => {
          state.dialogs.nohost.open = true;
        }),
        false,
        'api/failedSystemConfig'
      );
    }
  },
  getFullConfig: async () => {
    const resp = await Ledfx('/api/config');
    if (resp && resp.host) {
      return { ...resp, ...{ ledfx_presets: undefined } };
    } else {
      set(
        produce((state: any) => {
          state.dialogs.nohost.open = true;
        }),
        false,
        'api/failedFullConfig'
      );
    }
  },
  setSystemConfig: async (config: any) => await Ledfx('/api/config', 'PUT', config),
  deleteSystemConfig: async () => await Ledfx('/api/config', 'DELETE'),
  importSystemConfig: async (config: any) => await Ledfx('/api/config', 'POST', config),
});
