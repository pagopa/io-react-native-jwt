import { JWSInvalid, JWTInvalid } from './utils/errors';
import type { JWSHeaderParameters } from './types';
import { ProduceJWT } from './produce';
import { encodeBase64, removePadding } from './utils/base64';

/**
 * The SignJWT class is used to build and sign Compact JWS formatted JSON Web Tokens.
 *
 * @example Usage with a given signature
 *
 * ```js
 * const alg = 'RS256'
 * const signature = 'Axy0....'
 *
 * const jwt = new SignJWT({ 'urn:example:claim': true })
 *   .setProtectedHeader({ alg })
 *   .setIssuedAt()
 *   .setIssuer('urn:example:issuer')
 *   .setAudience('urn:example:audience')
 *   .setExpirationTime('2h')
 *   .sign(signature)
 *
 * console.log(jwt)
 * ```
 */
export class SignJWT extends ProduceJWT {
  private _protectedHeader!: JWSHeaderParameters;

  /**
   * Sets the JWS Protected Header on the SignJWT object.
   *
   * @param protectedHeader JWS Protected Header. Must contain an "alg" (JWS Algorithm) property.
   */
  setProtectedHeader(protectedHeader: JWSHeaderParameters) {
    this._protectedHeader = protectedHeader;
    return this;
  }

  /**
   * Return content to sign.
   *
   */
  toSign(): string {
    let protectedHeader = encodeBase64(JSON.stringify(this._protectedHeader));
    let payload = encodeBase64(JSON.stringify(this._payload));
    if (payload && protectedHeader) {
      return `${protectedHeader}.${payload}`;
    } else {
      throw new JWSInvalid();
    }
  }

  /**
   * Append JWS to unsigned JWT.
   *
   * @param jwtWithoutSignature
   * @param jws
   */
  static appendJws(jwtWithoutSignature: string, jws: string): string {
    if (typeof jwtWithoutSignature !== 'string' || typeof jws !== 'string') {
      throw new JWTInvalid('JWS must be a string');
    }
    if (jws === '') throw new JWSInvalid('Invalid signature');

    const encodedJws = removePadding(jws);

    return `${jwtWithoutSignature}.${encodedJws}`;
  }
}
