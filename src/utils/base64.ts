import { btoa, atob } from 'abab';

export function encodeBase64(value: string): string {
  let encoded = btoa(value);
  if (encoded) {
    // eslint-disable-next-line no-div-regex
    return encoded.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  } else {
    throw new Error('Unable to encode string to base64');
  }
}

export function decodeBase64(value: string): string {
  let dencoded = atob(value);
  if (dencoded) {
    return dencoded;
  } else {
    throw new Error('Unable to decode base64 string');
  }
}
