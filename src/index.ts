import { NativeModules, Platform } from 'react-native';
import { z } from 'zod';

import { JWEHeader, JWK } from './types';

const LINKING_ERROR =
  `The package '@pagopa/io-react-native-jwt' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const IoReactNativeJwt = NativeModules.IoReactNativeJwt
  ? NativeModules.IoReactNativeJwt
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

/**
 * Verify the signature of a compact JWS with the given public key.
 *
 * @param token The compact JWS
 * @param jwk The public key in JWK format (EC or RSA)
 * @returns Whether the signature is valid
 */
export const verify = async (token: string, jwk: JWK): Promise<boolean> =>
  z
    .boolean()
    .parse(
      await IoReactNativeJwt.verify(z.string().parse(token), JWK.parse(jwk))
    );

/**
 * Transcode an ASN.1/DER encoded ECDSA signature into the concatenated R + S format.
 *
 * @param signature The base64 encoded ASN.1/DER signature
 * @param coordinateOctetLength The length in bytes of each coordinate (32 for P-256, 48 for P-384, 66 for P-521)
 * @returns The base64 encoded R + S signature
 */
export const unpackBerEncodedASN1 = async (
  signature: string,
  coordinateOctetLength: number
): Promise<string> =>
  z
    .string()
    .parse(
      await IoReactNativeJwt.unpackBerEncodedASN1(
        z.string().parse(signature),
        z.number().int().positive().parse(coordinateOctetLength)
      )
    );

/**
 * Compute the RFC 7638 thumbprint of a JWK.
 *
 * @param jwk The key in JWK format (EC or RSA)
 * @returns The base64url encoded SHA-256 thumbprint
 */
export const thumbprint = async (jwk: JWK): Promise<string> =>
  z.string().parse(await IoReactNativeJwt.thumbprint(JWK.parse(jwk)));

/**
 * Compute the SHA-256 hash of the UTF-8 encoded string.
 *
 * @param toHash The string to hash
 * @returns The base64 encoded hash
 */
export const sha256 = async (toHash: string): Promise<string> =>
  z.string().parse(await IoReactNativeJwt.sha256(z.string().parse(toHash)));

/**
 * Encrypt the plaintext as a compact JWE.
 *
 * @param plaintext The plaintext to encrypt
 * @param header The JWE protected header, must contain a supported `alg` and `enc`
 * @param jwk The recipient public key in JWK format (EC or RSA)
 * @returns The compact JWE
 */
export const enc = async (
  plaintext: string,
  header: JWEHeader,
  jwk: JWK
): Promise<string> =>
  z
    .string()
    .parse(
      await IoReactNativeJwt.enc(
        z.string().parse(plaintext),
        JWEHeader.parse(header),
        JWK.parse(jwk)
      )
    );

export { JWEHeader, JWK } from './types';
