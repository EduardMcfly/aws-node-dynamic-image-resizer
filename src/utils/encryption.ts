import pako from 'pako';
import { AES, enc } from 'crypto-js';

const KEY = 'test';
export const decrypt = (text: string) => {
  return text;
  return AES.decrypt(
    pako.inflate(text, {
      to: 'string',
    }),
    KEY,
  ).toString(enc.Utf8);
};

export const encrypt = (text: string) => {
  return text;
  return pako.deflate(AES.encrypt(text, KEY).toString(), {
    to: 'string',
  });
};
