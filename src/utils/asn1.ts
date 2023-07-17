import { getCoordinateOctetLength, getKtyFromAlg } from '../algorithms';
import { IoReactNativeJwt } from './proxy';
import { removePadding } from './base64';
import { JOSENotSupported } from './errors';

// Convert the ASN.1/DER encoded signature to a JOSE-style concatenated signature. Returns a base64 url encoded String.
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
