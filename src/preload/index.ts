import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

import type { ipcAuthResponse } from '../types/mainProcess/ipcResponse';

const authAPI = {
  createSession: async (
    pds: string,
    identifier: string,
    password: string,
  ): Promise<ipcAuthResponse> => {
    return ipcRenderer.invoke('auth:createSession', { pds, identifier, password });
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('authAPI', authAPI);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
