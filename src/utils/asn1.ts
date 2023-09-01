import {
  getCoordinateOctetLength,
  getKtyFromAlg,
  type SupportedAlgorithm,
} from '../algorithms';
import { IoReactNativeJwt } from './proxy';
import { removePadding } from './base64';
import { JOSENotSupported } from './errors';

/*
 * Transcodes the JCA ASN.1/DER-encoded signature into the concatenated R + S format expected by ECDSA JWS.
 * Returns a base64 url encoded String.
 *
 * @example Usage with an ASN.1/DER-encoded
 *
 * ```js
 * const asn1Signature = 'Yw1xTT....'
 * const plainSignature = await derToJose(asn1Signature, "ECDSA256")
 *
 * ```
 *
 * @param asn1Signature ASN.1/DER-encoded signature
 * @param alg Algorithm used to sign
 */
export const derToJose = async (
  asn1Signature: string,
  alg: SupportedAlgorithm
): Promise<string> => {
  const kty = getKtyFromAlg(alg);
  if (kty === 'EC') {
    const unpackedJws = await IoReactNativeJwt.unpackBerEncodedASN1(
      asn1Signature,
      getCoordinateOctetLength(alg)
    );
    const encodedJws = removePadding(unpackedJws).replace(
      /(?:\r\n|\r|\n)/g,
      ''
    );
    return encodedJws;
  } else {
    throw new JOSENotSupported('Unsupported "alg" value');
  }
};
