import { Base64 } from 'js-base64';

/*
 * JWTs make use of the base64url encoding as defined in RFC 4648.
 * As allowed by Section 3.2 of the RFC, this specification mandates
 * that base64url encoding when used with JWTs MUST NOT use padding.
 * The reason for this restriction is that the padding character
 * ('=') is not URL safe.
 */

/**
 * Encodes a UTF-8 string as base64url, without padding.
 */
export function encodeBase64Url(value: string): string {
  return Base64.encode(value, true);
}

/**
 * Decodes a base64 or base64url string (padded or not) to a UTF-8 string.
 */
export function decodeBase64Url(value: string): string {
  return Base64.decode(value);
}

/**
 * Converts a standard base64 string to base64url: strips the padding and
 * replaces `+` and `/` with `-` and `_`.
 */
export function base64ToBase64Url(encoded: string): string {
  // eslint-disable-next-line no-div-regex
  return encoded.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
