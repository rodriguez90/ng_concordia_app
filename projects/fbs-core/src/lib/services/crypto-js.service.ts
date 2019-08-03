import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Config, ConfigService} from '../config';

@Injectable()
export class CryptoJsService {

  constructor(private config: ConfigService<Config>) { }

  encode(value: string): string {
    const key = CryptoJS.enc.Utf8.parse(this.config.configApp().secretKey);
    const iv = CryptoJS.enc.Utf8.parse(this.config.configApp().secretKey);
    const pass = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(value),
      key,
      {
        keySize: 128 / 8,
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return pass.toString();
  }
}
