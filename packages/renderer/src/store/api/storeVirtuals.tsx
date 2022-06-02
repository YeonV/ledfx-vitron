import produce from 'immer';
import { Ledfx } from '@/api/ledfx';

export const storeVirtuals = (set: any) => ({
  virtuals: {},
  getVirtuals: async () => {
    const resp = await Ledfx('/api/virtuals');
    if (resp) {
      set(produce((state: any) => {
          state.paused = resp.paused;
      }),false,'api/gotPausedState')      
      if (resp && resp.virtuals) {
        set(produce((state: any) => {
            state.virtuals = resp.virtuals;
        }),false,'api/gotVirtuals')
      }
    }
  },
  addVirtual: async (config: any) =>
    await Ledfx(`/api/virtuals`, 'POST', config),
  updateVirtual: async (virtId: string, active: boolean) =>
    await Ledfx(`/api/virtuals/${virtId}`, 'PUT', {
      active: active,
    }),
  deleteVirtual: async (virtId: string) =>
    await Ledfx(`/api/virtuals/${virtId}`, 'DELETE'),
  clearVirtualEffect: async (virtId: string) =>
    await Ledfx(`/api/virtuals/${virtId}/effects`, 'DELETE'),
  setVirtualEffect: async (
    virtId: string,
    type: string,
    config: any,
    active: boolean
  ) => {
    const resp = await Ledfx(`/api/virtuals/${virtId}/effects`, 'POST', {
      type,
      config,
      active,
    });

    if (resp && resp.effect) {
      set(produce((state: any) => {
          state.virtuals[virtId].effect = {
            type: resp.effect.type,
            name: resp.effect.name,
            config: resp.effect.config,
          };
      }),false,'api/setVirtualEffect');
    }
  },
  updateVirtualEffect: async (
    virtId: string,
    type: string,
    config: any,
    active: boolean
  ) => {
    const resp = await Ledfx(`/api/virtuals/${virtId}/effects`, 'PUT', {
      type,
      config,
      active,
    });
    if (resp && resp.status && resp.status === 'success') {
      if (resp && resp.effect) {
        set(produce((state: any) => {
            state.virtuals[virtId].effect = {
              type: resp.effect.type,
              name: resp.effect.name,
              config: resp.effect.config,
            };
        }),false,'api/updateVirtualEffect');
      }
    }
  },
  updateVirtualSegments: async (virtId: string, segments: any) => {
    const resp = await Ledfx(`/api/virtuals/${virtId}`, 'POST', {
      segments: [...segments],
    });
    if (resp && resp.status && resp.status === 'success') {
      if (resp && resp.effect) {
        set(produce((state: any) => {
            state.virtuals[virtId].effect = {
              type: resp.effect.type,
              name: resp.effect.name,
              config: resp.effect.config,
            };
        }),false,'api/updateVirtualsSegments');
      }
    }
  },
});
