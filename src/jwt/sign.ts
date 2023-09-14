import { JOSENotSupported, JWTInvalid } from '../utils/errors';
import type { JWSHeaderParameters, JWTDecodeResult } from '../types';
import { ProduceJWT } from './produce';
import { decodeBase64, encodeBase64, removePadding } from '../utils/base64';
import {
  getAlgFromKey,
  isAlgSupported,
  type SupportedAlgorithm,
} from '../algorithms';

import { derToJose } from '../utils/asn1';
import type { CryptoContext } from 'src/utils/crypto';

/**
 * The SignJWT class is used to build and sign Compact JWS formatted JSON Web Tokens.
 *
 * @example Usage with a given signature
 *
 * ```js
 * const crypto: Crypto = { any implementation fo Crypto interface }
 *
 * const jwt = new SignJWT(crypto)
 *   .setPayload({ 'urn:example:claim': true })
 *   .setProtectedHeader({ typ })
 *   .setIssuedAt()
 *   .setIssuer('urn:example:issuer')
 *   .setAudience('urn:example:audience')
 *   .setExpirationTime('2h')
 *
 * jwt.data()
 * await jwt.sign()
 * ```
 */

export class SignJWT extends ProduceJWT {
  private _protectedHeader: Omit<JWSHeaderParameters, 'alg'> = {};
  private crypto: CryptoContext;

  /**
   * @param crypto An implementation of the crypto interface. @see utils/crypto for more.
   */
  constructor(crypto: CryptoContext) {
    super();
    this.crypto = crypto;
  }

  /**
   * Sets the JWS Protected Header on the SignJWT object.
   * Any invocation overrides what's been already put in the header.
   * Value for "alg" are ignored, as it will be inferred by the key used by the cryptographic context.
   *
   * @param protectedHeader JWS Protected Header.
   */
  setProtectedHeader(protectedHeader: Omit<JWSHeaderParameters, 'alg'>) {
    this._protectedHeader = protectedHeader;
    return this;
  }

  /**
   * Return a JWT without signature (`header.payload`).
   *
   */
  private async unsigned(): Promise<string> {
    const { alg } = await this.getSelectedSigningAlgorithm();

    return [{ ...this._protectedHeader, alg }, this._payload]
      .map((e) => JSON.stringify(e))
      .map(encodeBase64)
      .join('.');
  }

  private async getSelectedSigningAlgorithm(): Promise<{
    kty: string;
    alg: SupportedAlgorithm;
  }> {
    const publicKey = await this.crypto.getPublicKey();
    const alg = getAlgFromKey(publicKey);

    return { kty: publicKey.kty, alg };
  }

  /**
   * Return a signed JWT.
   *
   */
  async sign(): Promise<string> {
    const unsigned = await this.unsigned();
    const signature = await this.crypto.getSignature(unsigned);

    const { kty, alg } = await this.getSelectedSigningAlgorithm();

    const encodedJws = await (kty === 'EC'
      ? derToJose(signature, alg)
      : removePadding(signature));

    return `${unsigned}.${encodedJws}`;
  }

  /**
   * Plain data of the produced JWT
   */
  data(): JWTDecodeResult {
    return { protectedHeader: this._protectedHeader, payload: this._payload };
  }

  /**
   * Decodes a signed JWT
   *
   * @param jwt JWT to sign that needs to be decoded.
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

    let protectedHeader: JWSHeaderParameters;
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
