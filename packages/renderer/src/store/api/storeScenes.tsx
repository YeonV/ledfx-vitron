import { Ledfx } from '@/api/ledfx';
import produce from 'immer';

export const storeScenes = (set: any) => ({
  scenes: {},
  getScenes: async () => {
    const resp = await Ledfx('/api/scenes');
    if (resp && resp.scenes) {
      set(produce((s:any) => {s.scenes = resp.scenes;}),false,'gotScenes');
    }
  },
  addScene: async (name: string, scene_image: string) =>
    await Ledfx('/api/scenes', 'POST', { name, scene_image }),
  activateScene: async (id: string) =>
    await Ledfx('/api/scenes', 'PUT', {
      id,
      action: 'activate',
    }),
  deleteScene: async (name: string) =>
    await Ledfx('/api/scenes', 'DELETE', { data: { id: name } }),
});
