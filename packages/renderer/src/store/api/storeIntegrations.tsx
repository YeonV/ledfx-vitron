import { Ledfx } from '@/api/ledfx';
import produce from 'immer';

export const storeIntegrations = (set: any) => ({
  integrations: {},
  getIntegrations: async () => {
    const resp = await Ledfx('/api/integrations');
    if (resp && resp.integrations) {
      set(produce((s:any) => {s.integrations = resp.integrations}),false,'gotIntegrations');
    }
  },
  addIntegration: async (config: any) =>
    await Ledfx(`/api/integrations`, 'POST', config),
  updateIntegration: async (config: any) =>
    await Ledfx(`/api/integrations`, 'POST', config),
  toggleIntegration: async (config: any) =>
    await Ledfx(`/api/integrations`, 'PUT', config),
  deleteIntegration: async (config: any) =>
    await Ledfx(`/api/integrations`, 'DELETE', { data: { id: config } }),
});
