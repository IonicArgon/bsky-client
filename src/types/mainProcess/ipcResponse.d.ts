export enum ipcStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type ipcResponse = {
  status: ipcStatus;
};

export interface ipcAuthResponse extends ipcResponse {
  msg: string;
}
