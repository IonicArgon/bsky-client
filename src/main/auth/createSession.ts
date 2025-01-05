import { jwtDecode } from 'jwt-decode';

import { ipcStatus } from '../../types/mainProcess/ipcResponse';

import type StorageManager from '../storage';
import type { ipcAuthResponse } from '../../types/mainProcess/ipcResponse';

type CreateSessionArgs = {
  storage: StorageManager;
  pds: string;
  identifier: string;
  password: string;
};

type SessionValues = {
  did: string;
  handle: string;
  email: string;
  accessJwt: string;
  refreshJwt: string;
};

const createSession = async ({
  storage,
  pds,
  identifier,
  password,
}: CreateSessionArgs): Promise<ipcAuthResponse> => {
  const res = await fetch(`${pds}/xrpc/com.atproto.server.createSession`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier,
      password,
    }),
  });

  switch (res.status) {
    case 200: {
      const { did, handle, email, accessJwt, refreshJwt }: SessionValues = await res.json();
      const { exp: accessJwtExpiry } = jwtDecode(accessJwt);
      const { exp: refreshJwtExpiry } = jwtDecode(refreshJwt);

      if (!accessJwtExpiry || !refreshJwtExpiry) {
        throw new Error('Invalid JWT returne');
      }

      storage.did = did;
      storage.handle = handle;
      storage.email = email;
      storage.accessJwt = accessJwt;
      storage.refreshJwt = refreshJwt;
      storage.accessJwtExpiry = accessJwtExpiry;
      storage.refreshJwtExpiry = refreshJwtExpiry;

      return {
        status: ipcStatus.SUCCESS,
        msg: 'Session created',
      };
    }
    case 401: {
      return {
        status: ipcStatus.ERROR,
        msg: 'Invalid credentials',
      };
    }
    case 400: {
      const { error, message } = await res.json();
      return {
        status: ipcStatus.ERROR,
        msg: `Unexpected error: ${error} - ${message}`,
      };
    }
    default: {
      return {
        status: ipcStatus.ERROR,
        msg: `Unexpected status code: ${res.status}`,
      };
    }
  }
};

export default createSession;
