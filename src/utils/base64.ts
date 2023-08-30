import { btoa, atob } from 'abab';
import { JOSEError } from './errors';

/*
 * In Base64 encoding, the length of an output-encoded String
 * must be a multiple of four. If necessary, the encoder adds
 * one or two padding characters (=) at the end of the output
 * as needed in order to meet this requirement.
 *
 * JWTs make use of the base64url encoding as defined in RFC 4648.
 * As allowed by Section 3.2 of the RFC, this specification mandates
 * that base64url encoding when used with JWTs MUST NOT use padding.
 * The reason for this restriction is that the padding character
 * ('=') is not URL safe.
 */
export function encodeBase64(value: string): string {
  let encoded = btoa(value);
  if (encoded) {
    return removePadding(encoded);
  } else {
    throw new JOSEError('Unable to encode string to base64');
  }
}

export function decodeBase64(value: string): string {
  let decoded = atob(addPadding(value));
  if (decoded) {
    return decoded;
  } else {
    throw new JOSEError('Unable to decode base64 string');
  }
}

export function removePadding(encoded: string): string {
  // eslint-disable-next-line no-div-regex
  return encoded.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export function addPadding(encoded: string): string {
  encoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
  var pad = encoded.length % 4;
  if (pad) {
    if (pad === 1) {
      throw new JOSEError(
        'InvalidLengthError: Input base64url string is the wrong length to determine padding'
      );
    }
    encoded += new Array(5 - pad).join('=');
  }
  return encoded;
}
