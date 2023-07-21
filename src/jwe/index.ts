import { JWEInvalid } from '../utils/errors';
import type { JWEHeaderParameters, JWK } from '../types';
import { IoReactNativeJwt } from '../utils/proxy';

/**
 * The EncryptJwe class is used to build and encrypt Flattened JWE objects.
 *
 * @example Usage
 *
 * ```js
 * const jwe = await new EncryptJwe(
 *   new TextEncoder().encode('It’s a dangerous business, Frodo, going out your door.'),
 * )
 *   .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
 *   .setAdditionalAuthenticatedData(encoder.encode('The Fellowship of the Ring'))
 *   .encrypt(publicKey)
 *
 * console.log(jwe)
 * ```
 */
export class EncryptJwe {
  private _plaintext: String;

  private _protectedHeader!: JWEHeaderParameters;

  /** @param plaintext String representation of the plaintext to encrypt. */
  constructor(plaintext: String) {
    this._plaintext = plaintext;
  }

  /**
   * Sets the JWE Protected Header on the EncryptJwe object.
   *
   * @param protectedHeader JWE Protected Header.
   */
  setProtectedHeader(protectedHeader: JWEHeaderParameters) {
    if (this._protectedHeader) {
      throw new TypeError('setProtectedHeader can only be called once');
    }
    this._protectedHeader = protectedHeader;
    return this;
  }

  /**
   * Encrypts and resolves the value of the Flattened JWE object.
   *
   * @param key Public Key or Secret to encrypt the JWE with. See
   */
  async encrypt(key: JWK): Promise<string> {
    if (!this._protectedHeader) {
      throw new JWEInvalid(
        'either setProtectedHeader must be called before #encrypt()'
      );
    }

    const { alg, enc } = this._protectedHeader;

    if (typeof alg !== 'string' || !alg) {
      throw new JWEInvalid(
        'JWE "alg" (Algorithm) Header Parameter missing or invalid'
      );
    }

    if (typeof enc !== 'string' || !enc) {
      throw new JWEInvalid(
        'JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid'
      );
    }
    let jwe = await IoReactNativeJwt.enc(
      this._plaintext,
      this._protectedHeader,
      key
    );
    return jwe;
  }
}
