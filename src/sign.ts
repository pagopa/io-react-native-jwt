import { JWTInvalid } from './utils/errors';
import type { JWSHeaderParameters } from './types';
import { ProduceJWT } from './produce';
import { encodeBase64 } from './utils/base64';

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
   * Signs and returns the JWT.
   *
   * @param signature Body signature previously obtained
   */
  sign(signature: string): string {
    if (
      Array.isArray(this._protectedHeader?.crit) &&
      this._protectedHeader.crit.includes('b64') &&
      this._protectedHeader.b64 === false
    ) {
      throw new JWTInvalid('JWTs MUST NOT use unencoded payload');
    }

    const header = encodeBase64(JSON.stringify(this._protectedHeader));
    const payload = encodeBase64(JSON.stringify(this._payload));

    return `${header}.${payload}.${signature}`;
  }
}
