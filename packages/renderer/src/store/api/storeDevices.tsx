import { Ledfx } from '@/api/ledfx';
import produce from 'immer';

export const storeDevices = (set: any) => ({
  devices: {},
  getDevices: async () => {
    const resp = await Ledfx('/api/devices');
    if (resp && resp.devices) {
      set(produce((state: any) => {
        state.devices = resp.devices;
      }),false,'api/gotDevices')
    }
  },
  getDevice: async (deviceId: string) => {
    const resp = await Ledfx(`/api/devices/${deviceId}`);
    if (resp && resp.data) {
      return {
        key: deviceId,
        id: deviceId,
        name: resp.data.name,
        config: resp.data,
        virtuals: resp.data.virtuals,
        active_virtuals: resp.data.active_virtuals,
      };
    }
  },
  addDevice: async (config: any) => await Ledfx(`/api/devices`, 'POST', config),
  activateDevice: async (deviceId: string) => {
    const resp = await Ledfx(`/api/devices/${deviceId}`, 'POST', {});
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
  updateDevice: async (deviceId: string, config: any) =>
    await Ledfx(`/api/devices/${deviceId}`, 'PUT', config),
});
