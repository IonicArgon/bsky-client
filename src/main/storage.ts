import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { app } from 'electron';

type Storage = {
  did: string;
  handle: string;
  email: string;
  accessJwt: string;
  refreshJwt: string;
  accessJwtExpiry: number;
  refreshJwtExpiry: number;
};

class StorageManager {
  did: string;
  handle: string;
  email: string;
  accessJwt: string;
  refreshJwt: string;
  accessJwtExpiry: number;
  refreshJwtExpiry: number;
  #storagePath: string;

  constructor() {
    const systemName = os.hostname();
    this.#storagePath = path.join(app.getPath('userData'), `storage-${systemName}.json`);

    if (!fs.existsSync(this.#storagePath)) {
      fs.writeFileSync(
        this.#storagePath,
        JSON.stringify({
          did: '',
          handle: '',
          email: '',
          accessJwt: '',
          refreshJwt: '',
          accessJwtExpiry: 0,
          refreshJwtExpiry: 0,
        }),
      );

      this.did = '';
      this.handle = '';
      this.email = '';
      this.accessJwt = '';
      this.refreshJwt = '';
      this.accessJwtExpiry = 0;
      this.refreshJwtExpiry = 0;
    } else {
      const storage = JSON.parse(fs.readFileSync(this.#storagePath, 'utf-8'));
      this.did = storage.did;
      this.handle = storage.handle;
      this.email = storage.email;
      this.accessJwt = storage.accessJwt;
      this.refreshJwt = storage.refreshJwt;
      this.accessJwtExpiry = storage.accessJwtExpiry;
      this.refreshJwtExpiry = storage.refreshJwtExpiry;
    }
  }

  writeStorage(value: Partial<Storage>) {
    this.did = value.did || this.did;
    this.handle = value.handle || this.handle;
    this.email = value.email || this.email;
    this.accessJwt = value.accessJwt || this.accessJwt;
    this.refreshJwt = value.refreshJwt || this.refreshJwt;
    this.accessJwtExpiry = value.accessJwtExpiry || this.accessJwtExpiry;
    this.refreshJwtExpiry = value.refreshJwtExpiry || this.refreshJwtExpiry;

    fs.writeFileSync(
      this.#storagePath,
      JSON.stringify({
        did: this.did,
        handle: this.handle,
        email: this.email,
        accessJwt: this.accessJwt,
        refreshJwt: this.refreshJwt,
        accessJwtExpiry: this.accessJwtExpiry,
        refreshJwtExpiry: this.refreshJwtExpiry,
      }),
    );
  }

  clearStorage() {
    this.did = '';
    this.handle = '';
    this.email = '';
    this.accessJwt = '';
    this.refreshJwt = '';
    this.accessJwtExpiry = 0;
    this.refreshJwtExpiry = 0;

    fs.writeFileSync(
      this.#storagePath,
      JSON.stringify({
        did: '',
        handle: '',
        email: '',
        accessJwt: '',
        refreshJwt: '',
        accessJwtExpiry: 0,
        refreshJwtExpiry: 0,
      }),
    );
  }
}

export default StorageManager;
