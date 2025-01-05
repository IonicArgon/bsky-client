import { ElectronAPI } from '@electron-toolkit/preload';

import type { ipcAuthResponse } from '../types/mainProcess/ipcResponse';

declare global {
  interface Window {
    electron: ElectronAPI;
    authAPI: {
      createSession: (
        pds: string,
        identifier: string,
        password: string,
      ) => Promise<ipcAuthResponse>;
    };
  }
}
