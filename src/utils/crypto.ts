import type { JWK } from '../types';

/**
 * The interface of a cryptographic context to be used to sign tokens.
 * Implementations are assumed to be initialized on a single, already-existing key pair.
 *
 * The generation and persistence of the key pair is delegated to the implementation.
 */
export interface CryptoContext {
  /**
   * Retrieves the public key to be used in this context.
   * MUST be the same key at every invocation.
   * @returns The public key to be used
   * @throws If no keys are found
   */
  getPublicKey: () => Promise<JWK>;
  /**
   * Produce a cryptographic signature for a given value.
   * The signature MUST be produced using the private key paired with the public retrieved by getPublicKey()
   * @param value The value to be signed
   * @returns The signature
   * @throws If no keys are found
   */
  getSignature: (value: string) => Promise<string>;
}
