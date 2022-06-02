import { Ledfx } from '@/api/ledfx';
import produce from 'immer';

export const storePresets = (set: any) => ({
  presets: {},
  getPresets: async (effectId: string) => {
    const resp = await Ledfx(`/api/effects/${effectId}/presets`);
    if (resp && resp.status === 'success') {
      
      set(produce((s:any) => {s.presets = resp;}),false,'gotPresets');
    }
  },
  addPreset: async (effectId: string, name: string) =>
    await Ledfx(`/api/virtuals/${effectId}/presets`, 'POST', { name }),
  activatePreset: async (
    virtId: string,
    category: string,
    effectType: string,
    presetId: string
  ) =>
    await Ledfx(`/api/virtuals/${virtId}/presets`, 'PUT', {
      category,
      effect_id: effectType,
      preset_id: presetId,
    }),
  deletePreset: async (effectId: string, presetId: string) =>
    await Ledfx(`/api/effects/${effectId}/presets`, 'DELETE', {
      data: {
        preset_id: presetId,
        category: 'user_presets',
      },
    }),
});
