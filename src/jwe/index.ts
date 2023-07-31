import type { JWEHeaderParameters, JWK } from '../types';
import { IoReactNativeJwt } from '../utils/proxy';

/**
 * The EncryptJwe class is used to build and encrypt Flattened JWE objects.
 *
 * @example Usage
 *
 * ```js
 * const jwe = await new EncryptJwe(
 *   new TextEncoder().encode('It’s a dangerous business, Frodo, going out your door.', { alg: 'RSA-OAEP-256', enc: 'A256GCM' }),
 * )
 *   .encrypt(publicKey)
 *
 * console.log(jwe)
 * ```
 */
export class EncryptJwe {
  private _plaintext: String;
  private _protectedHeader!: JWEHeaderParameters & { alg: string; enc: string };

  /** @param plaintext String representation of the plaintext to encrypt. */
  /** @param header JWE header with alg and enc parameters. */
  constructor(
    plaintext: String,
    header: JWEHeaderParameters & { alg: string; enc: string }
  ) {
    this._plaintext = plaintext;
    this._protectedHeader = header;
  }

  /**
   * Encrypts and resolves the value of the Flattened JWE object.
   *
   * @param key Public Key or Secret to encrypt the JWE with. See
   */
  async encrypt(key: JWK): Promise<string> {
    let jwe = await IoReactNativeJwt.enc(
      this._plaintext,
      this._protectedHeader,
      key
    );
    return jwe;
  }
}
