import { JOSENotSupported, JWTInvalid } from '../utils/errors';
import type { JWK, JWSHeaderParameters, JWTDecodeResult } from '../types';
import { ProduceJWT } from './produce';
import {
  decodeBase64Url,
  encodeBase64Url,
  base64ToBase64Url,
} from '../utils/base64';
import {
  getAlgFromKey,
  isAlgSupported,
  type SupportedAlgorithm,
} from '../algorithms';

import { derToJose } from '../utils/asn1';

/**
 * A key pair abstraction: it exposes the public key and signs with the paired private key.
 */
export type JWTSigner = {
  getPublicKey: () => Promise<JWK>;
  /**
   * Signs the given value with the private key paired with the public key returned by {@link JWTSigner.getPublicKey}.
   * For EC keys the signature MUST be DER encoded, for RSA keys base64 encoded.
   */
  sign: (value: string) => Promise<string>;
};

/**
 * The JWT class is used to build and sign Compact JWS formatted JSON Web Tokens.
 *
 * @example Usage with a given signature
 *
 * ```js
 * const getPublicKey = async (): Promise<JWK> => { public key of the signing key pair }
 * const sign = (value: string) => { any implementation signing with the paired private key }
 *
 * const jwt = new JWT({ getPublicKey, sign })
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

export class JWT extends ProduceJWT {
  private _protectedHeader: Omit<JWSHeaderParameters, 'alg'> = {};
  private signer: JWTSigner;

  /**
   * @param signer Provides the public key and signs with the paired private key.
   * The public key determines the signing algorithm.
   */
  constructor(signer: JWTSigner) {
    super();
    this.signer = signer;
  }

  /**
   * Sets the JWS Protected Header on the JWT object.
   * Any invocation overrides what's been already put in the header.
   * Value for "alg" are ignored, as it will be inferred by the public key.
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
  private unsigned(alg: SupportedAlgorithm): string {
    return [{ ...this._protectedHeader, alg }, this._payload]
      .map((e) => JSON.stringify(e))
      .map(encodeBase64Url)
      .join('.');
  }

  /**
   * Return a signed JWT.
   */
  async sign(): Promise<string> {
    const publicKey = await this.signer.getPublicKey();
    const alg = getAlgFromKey(publicKey);

    const unsigned = this.unsigned(alg);
    const signature = await this.signer.sign(unsigned);

    const encodedJws = await (publicKey.kty === 'EC'
      ? derToJose(signature, alg)
      : base64ToBase64Url(signature));

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
      let decoded = decodeBase64Url(encodedHeader!);
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

    let decodedPayload = decodeBase64Url(encodedPayload!);
    const payload = JSON.parse(decodedPayload);

    return {
      payload,
      protectedHeader,
    };
  }
}
