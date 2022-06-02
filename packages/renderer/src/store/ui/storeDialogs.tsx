import produce from 'immer';

export const storeDialogs = (set: any) => ({
  dialogs: {
    nohost: {
      open: false,
      edit: false,
    },
    addScene: {
      open: false,
    },
    addDevice: {
      open: false,
      edit: {},
    },
    addVirtual: {
      open: false,
      edit: {},
    },
    addIntegration: {
      open: false,
      edit: {},
    },
  },
  setDialogOpen: (open: boolean, edit?: boolean) =>
    set(
      produce((state: any) => {
        state.dialogs.nohost = {
          open,
          edit,
        };
      }),
      false,
      'api/dialog/nohost'
    ),
  setDialogOpenAddScene: (open: boolean, edit?: boolean) =>
    set(
      produce((state: any) => {
        state.dialogs.addScene = {
          open,
          edit,
        };
      }),
      false,
      'api/dialog/AddScene'
    ),
  setDialogOpenAddDevice: (open: boolean, edit?: boolean) =>
    set(
      produce((state: any) => {
        state.dialogs.addDevice = {
          open,
          edit,
        };
      }),
      false,
      'api/dialog/AddDevice'
    ),
  setDialogOpenAddVirtual: (open: boolean, edit?: boolean) =>
    set(
      produce((state: any) => {
        state.dialogs.addVirtual = {
          open,
          edit,
        };
      }),
      false,
      'api/dialog/AddVirtual'
    ),
  setDialogOpenAddIntegration: (open: boolean, edit?: boolean) =>
    set(
      produce((state: any) => {
        state.dialogs.addIntegration = {
          open,
          edit,
        };
      }),
      false,
      'api/dialog/AddIntegration'
    ),
});
