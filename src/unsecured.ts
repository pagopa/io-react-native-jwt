const { atob, btoa } = require('abab');

import type {
  JWSHeaderParameters,
  JWTClaimVerificationOptions,
  JWTPayload,
} from './types';

import { JWTInvalid } from './utils/errors';
import jwtPayload from './jwt_claims_set';
import { ProduceJWT } from './produce';

export interface UnsecuredResult {
  payload: JWTPayload;
  header: JWSHeaderParameters;
}

/**
 * The UnsecuredJWT class is a utility for dealing with `{ "alg": "none" }` Unsecured JWTs.
 *
 * @example Encoding
 *
 * ```js
 * const unsecuredJwt = new jose.UnsecuredJWT({ 'urn:example:claim': true })
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
 * const payload = jose.UnsecuredJWT.decode(jwt, {
 *   issuer: 'urn:example:issuer',
 *   audience: 'urn:example:audience',
 * })
 *
 * console.log(payload)
 * ```
 */
export class UnsecuredJWT extends ProduceJWT {
  /** Encodes the Unsecured JWT. */
  encode(): string {
    const header = btoa(JSON.stringify({ alg: 'none' }));
    const payload = btoa(JSON.stringify(this._payload));

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

    if (length !== 3 || signature !== '') {
      throw new JWTInvalid('Invalid Unsecured JWT');
    }

    let header: JWSHeaderParameters;
    try {
      header = JSON.parse(atob(encodedHeader));
      if (header.alg !== 'none') throw new Error();
    } catch {
      throw new JWTInvalid('Invalid Unsecured JWT');
    }

    const payload = jwtPayload(
      header,
      JSON.parse(atob(encodedPayload)),
      options
    );

    return { payload, header };
  }
}
