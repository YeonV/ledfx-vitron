import { useStore } from '@/store/useStore';
import axios from 'axios';
import produce from 'immer'

const baseURL = window.ipcRenderer ? 'http://localhost:8888' : !!window.localStorage.getItem('ledfx-newbase') ? 'http://localhost:8080' : window.location.href.split('/#')[0] || 'http://localhost:8888';
const storedURL = window.localStorage.getItem('ledfx-host');

const api = axios.create({
  baseURL: storedURL || baseURL,
});

export const Ledfx = async (
  path: string,
  method?: 'GET'|'PUT'|'POST'|'DELETE',
  body?: any
) => {
  const { setState } = useStore
    try {
      let response = null as any;
      switch (method) {
        case 'PUT':
          response = await api.put(path, body);
          break;
        case 'DELETE':
          response = await api.delete(path, body);
          break;
        case 'POST':
          response = await api.post(path, body);
          break;

        default:
          response = await api.get(path);
          break;
      }

      if (response.data && response.data.payload) {
        setState(produce(state => {
            state.ui.snackbar = {
                isOpen: true,
                messageType: response.data.payload.type || 'error',
                message:
                  response.data.payload.reason || response.data.payload.message || JSON.stringify(response.data.payload),
              }
          }));
        if (response.data.status) {
          return response.data.status
        }
      }
      if (response.payload) {
        setState(produce(state => {
            state.ui.snackbar = {
              isOpen: true,
              messageType: response.payload.type || 'error',
              message:
                response.payload.reason || response.payload.message || JSON.stringify(response.payload),
            }
          }));
      }
      if (response.status === 200) {
        setState(produce(state => { state.general.disconnected = false }));
        return response.data || response;
      }

      setState(produce(state => {
        state.ui.snackbar = {
            isOpen: true,
            messageType: 'error',
            message: response.error || JSON.stringify(response),
          }
        }));
    } catch (error:any) {
      if (error.message) {
        return setState(produce(state => {
            state.ui.snackbar = {
              isOpen: true,
              messageType: 'error',
              message: JSON.stringify(error.message),
            }
        }));
      }
      setState(produce(state => {
        state.ui.snackbar = {
            isOpen: true,
            messageType: 'error',
            message: JSON.stringify(error, null, 2),
        }
      }));
    }
};
