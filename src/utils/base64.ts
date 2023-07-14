import { btoa, atob } from 'abab';
import { JOSEError } from './errors';

export function encodeBase64(value: string): string {
  let encoded = btoa(value);
  if (encoded) {
    // eslint-disable-next-line no-div-regex
    return encoded.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  } else {
    throw new JOSEError('Unable to encode string to base64');
  }
}

export function decodeBase64(value: string): string {
  let decoded = atob(value);
  if (decoded) {
    return decoded;
  } else {
    throw new JOSEError('Unable to decode base64 string');
  }
}
