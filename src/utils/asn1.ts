import { getCoordinateOctetLength, getKtyFromAlg } from '../algorithms';
import { IoReactNativeJwt } from './proxy';
import { removePadding } from './base64';
import { JOSENotSupported } from './errors';

/*
 * Convert the ASN.1/DER encoded signature to a JOSE-style concatenated signature.
 * Returna a base64 url encoded String.
 *
 * @example Usage with an ASN.1 PAR encoded
 *
 * ```js
 * const asn1Signature = 'Yw1xTT....'
 * const plainSignature = await derToJose(asn1Signature, "ECDSA256")
 *
 * ```
 *
 * @param asn1Signature ASN.1 PAR encoded signature
 * @param alg Algorithm used to sign
 */
export const derToJose = async (
  asn1Signature: string,
  alg: string
): Promise<string> => {
  let kty = getKtyFromAlg(alg);
  if (kty === 'EC') {
    let len = getCoordinateOctetLength(alg);
    let unpackedJws = await IoReactNativeJwt.unpackBerEncodedASN1(
      asn1Signature,
      len
    );
    const encodedJws = removePadding(unpackedJws);
    return encodedJws;
  } else {
    throw new JOSENotSupported('Unsupported "alg" value');
  }
};
