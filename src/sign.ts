import { JOSENotSupported, JWSInvalid, JWTInvalid } from './utils/errors';
import type {
  CompactJWSHeaderParameters,
  JWTDecodeResult,
  JWTPayload,
} from './types';
import { ProduceJWT } from './produce';
import { decodeBase64, encodeBase64, removePadding } from './utils/base64';
import { isAlgSupported } from './algorithms';

import { derToJose } from './utils/asn1';

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
  private _protectedHeader!: CompactJWSHeaderParameters;

  /**
   * Sets the JWS Protected Header on the SignJWT object.
   *
   * @param protectedHeader JWS Protected Header. Must contain an "alg" (JWS Algorithm) property.
   */
  setProtectedHeader(protectedHeader: CompactJWSHeaderParameters) {
    if (protectedHeader.alg && isAlgSupported(protectedHeader.alg)) {
      this._protectedHeader = protectedHeader;
      return this;
    }
    throw new JOSENotSupported('Unsupported "alg" value');
  }

  /**
   * Return a JWT without signature (`header.payload`) to sign.
   *
   */
  toSign(): string {
    if (!this._protectedHeader || !this._protectedHeader.alg) {
      throw new JWSInvalid(
        'Missing signature algorithm. Specify the `alg` field'
      );
    }
    let protectedHeader = encodeBase64(JSON.stringify(this._protectedHeader));
    let payload = encodeBase64(JSON.stringify(this._payload));
    if (payload && protectedHeader) {
      return `${protectedHeader}.${payload}`;
    } else {
      throw new JWSInvalid();
    }
  }

  /**
   * Append signature to unsigned JWT.
   *
   * @param jwtWithoutSignature
   * @param signature
   */
  static async appendSignature(
    jwtWithoutSignature: string,
    signature: string
  ): Promise<string> {
    if (
      typeof jwtWithoutSignature !== 'string' ||
      typeof signature !== 'string'
    ) {
      throw new JWTInvalid('JWS must be a string');
    }
    if (signature === '') throw new JWSInvalid('Invalid signature');

    let jwtDecoded = SignJWT.decodeJwtWithoutSignature(jwtWithoutSignature);
    let alg = jwtDecoded.header.alg;
    try {
      const encodedJws = await derToJose(signature, alg);
      return `${jwtWithoutSignature}.${encodedJws}`;
    } catch {
      const encodedJws = removePadding(signature);
      return `${jwtWithoutSignature}.${encodedJws}`;
    }
  }

  /**
   * Decodes a JWT without signature
   *
   * @param jwtWithoutSignature JWT to sign that needs to be decoded.
   */
  static decodeJwtWithoutSignature(jwtWithoutSignature: string): {
    payload: JWTPayload;
    header: CompactJWSHeaderParameters;
  } {
    if (typeof jwtWithoutSignature !== 'string') {
      throw new JWTInvalid('JWT must be a string');
    }
    const {
      0: encodedHeader,
      1: encodedPayload,
      length,
    } = jwtWithoutSignature.split('.');

    let header: CompactJWSHeaderParameters;
    try {
      let decoded = decodeBase64(encodedHeader!);
      header = JSON.parse(decoded);
      if (!header.alg || !isAlgSupported(header.alg)) {
        throw new JOSENotSupported('Unsupported "alg" value');
      }
    } catch {
      throw new JWTInvalid('Unable to decode JWT header');
    }

    if (length !== 2 || encodedPayload === '') {
      throw new JWTInvalid('Invalid JWT to sign');
    }

    let decodedPayload = decodeBase64(encodedPayload!);
    const payload = JSON.parse(decodedPayload);

    return {
      payload,
      header,
    };
  }

  /**
   * Decodes a JWT without signature
   *
   * @param jwtWithoutSignature JWT to sign that needs to be decoded.
   */
  static decode(jwt: string): JWTDecodeResult {
    if (typeof jwt !== 'string') {
      throw new JWTInvalid('JWT must be a string');
    }
    const {
      0: encodedHeader,
      1: encodedPayload,
      2: signature,
      length,
    } = jwt.split('.');

    let protectedHeader: CompactJWSHeaderParameters;
    try {
      let decoded = decodeBase64(encodedHeader!);
      protectedHeader = JSON.parse(decoded);
      if (!protectedHeader.alg || !isAlgSupported(protectedHeader.alg)) {
        throw new JOSENotSupported('Unsupported "alg" value');
      }
    } catch {
      throw new JWTInvalid('Unable to decode JWT header');
    }

    if (length !== 3 || encodedPayload === '' || signature === '') {
      throw new JWTInvalid('Invalid JWT');
    }

    let decodedPayload = decodeBase64(encodedPayload!);
    const payload = JSON.parse(decodedPayload);

    return {
      payload,
      protectedHeader,
    };
  }
}
