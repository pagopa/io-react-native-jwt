import type {
  JWTClaimVerificationOptions,
  JWTPayload,
  JWTUnsecuredHeaderParameters,
} from '../types';

import { JWTInvalid } from '../utils/errors';
import jwtPayload from './jwt_claims_set';
import { ProduceJWT } from './produce';
import { decodeBase64, encodeBase64 } from '../utils/base64';

export interface UnsecuredResult {
  payload: JWTPayload;
  header: JWTUnsecuredHeaderParameters;
}

/**
 * The UnsecuredJWT class is a utility for dealing with `{ "alg": "none" }` Unsecured JWTs.
 *
 * @example Encoding
 *
 * ```js
 * const unsecuredJwt = new UnsecuredJWT({ 'urn:example:claim': true })
 *   .setIssuedAt()
 *   .setIssuer('urn:example:issuer')
 *   .setAudience('urn:example:audience')
 *   .setExpirationTime('2h')
 *   .encode()
 *
 * console.log(unsecuredJwt)
 * ```
 *
 * @example Decoding
 *
 * ```js
 * const payload = UnsecuredJWT.decode(jwt, {
 *   issuer: 'urn:example:issuer',
 *   audience: 'urn:example:audience',
 * })
 *
 * console.log(payload)
 * ```
 *  * @example JWT content ToSign
 *
 * ```js
 * const jwtToSign = new UnsecuredJWT({ 'urn:example:claim': true })
 *   .setIssuedAt()
 *   .setIssuer('urn:example:issuer')
 *   .setAudience('urn:example:audience')
 *   .setExpirationTime('2h')
 *   .toSign()
 *
 * console.log(jwtToSign)
 * ```
 */
export class UnsecuredJWT extends ProduceJWT {
  /** Encodes the Unsecured JWT. */
  encode(): string {
    const header = encodeBase64(JSON.stringify({ alg: 'none' }));
    const payload = encodeBase64(JSON.stringify(this._payload));

    return `${header}.${payload}.`;
  }

  /**
   * Decodes an unsecured JWT.
   *
   * @param jwt Unsecured JWT to decode the payload of.
   * @param options JWT Claims Set validation options.
   */
  static decode(
    jwt: string,
    options?: JWTClaimVerificationOptions
  ): UnsecuredResult {
    if (typeof jwt !== 'string') {
      throw new JWTInvalid('Unsecured JWT must be a string');
    }
    const {
      0: encodedHeader,
      1: encodedPayload,
      2: signature,
      length,
    } = jwt.split('.');

    if (length !== 3 || signature !== '' || !encodedPayload) {
      throw new JWTInvalid('Invalid Unsecured JWT');
    }

    let header: JWTUnsecuredHeaderParameters;
    try {
      let decoded = decodeBase64(encodedHeader!);
      header = JSON.parse(decoded);
      if ('alg' in header && header.alg !== 'none') throw new Error();
    } catch {
      throw new JWTInvalid('Invalid Unsecured JWT');
    }

    let payload = UnsecuredJWT.decodePayload(encodedPayload, options);

    return { payload, header: JSON.parse(decodeBase64(encodedHeader!)) };
  }

  /**
   * Decodes an unsecured JWT payload.
   *
   * @param jwt Unsecured JWT payload to decode.
   * @param options JWT Claims Set validation options.
   */
  static decodePayload(
    jwt: string,
    options?: JWTClaimVerificationOptions
  ): JWTPayload {
    if (typeof jwt !== 'string') {
      throw new JWTInvalid('Unsecured JWT must be a string');
    }
    const { 0: encodedPayload, length } = jwt.split('.');

    if (length !== 1 || encodedPayload === '') {
      throw new JWTInvalid('Invalid Unsecured JWT');
    }

    let decodedPayload = decodeBase64(encodedPayload!);
    const payload = jwtPayload({}, JSON.parse(decodedPayload), options);

    return payload;
  }
}
