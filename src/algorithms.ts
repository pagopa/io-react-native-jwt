import type { JWK } from './types';
import { JOSENotSupported } from './utils/errors';

export const supportedAlgorithms = [
  'RS256',
  'RS384',
  'RS512',
  'PS256',
  'PS384',
  'PS512',
  'ES256',
  'ES384',
  'ES512',
] as const;
export type SupportedAlgorithm = (typeof supportedAlgorithms)[number];

export const isAlgSupported = (alg: string): alg is SupportedAlgorithm =>
  (supportedAlgorithms as unknown as string[]).includes(alg.toUpperCase());

export const getKtyFromAlg = (alg: string) => {
  switch (alg.slice(0, 2)) {
    case 'RS':
    case 'PS':
      return 'RSA';
    case 'ES':
      return 'EC';
    default:
      throw new JOSENotSupported(
        'Unsupported "alg" value for a JSON Web Key Set'
      );
  }
};

/**
 * Given a key type, valdates if a signing algorithm is compatible
 *
 * @param kty The given key type
 * @param alg The signing algorithm
 *
 * @returns The provided algorithm in case it's compatible
 * @throws {JOSENotSupported} If the signing algorithm is not compatible with the provided key type
 */
export const validateAlgFromKty = (
  kty: string,
  alg: string
): SupportedAlgorithm => {
  if (!isAlgSupported(alg)) {
    throw new JOSENotSupported(`Unsupported algorithm ${alg}`);
  }

  const signatureAlg = alg.slice(0, 2);
  const hashingAlg = alg.slice(2, 5);

  const supportedHashes = ['256', '384', '512'];

  if (!supportedHashes.includes(hashingAlg)) {
    throw new JOSENotSupported(
      `Unsupported hashing algorithm, expected one of {${supportedHashes.join(
        ', '
      )}}, received ${hashingAlg}`
    );
  }

  if (
    /* is valid for EC */ (kty === 'EC' && signatureAlg === 'ES') ||
    /* OR is valid for RSA */ (kty === 'RSA' &&
      ['RS', 'PS'].includes(signatureAlg))
  ) {
    return alg;
  }

  throw new JOSENotSupported(
    `Unsupported "alg" value for a JSON Web Key Set. alg=${alg} is not compatible with kty=${kty}`
  );
};

export const getAlgFromKey = ({ kty, alg, crv }: JWK): SupportedAlgorithm => {
  if (kty === 'RSA' && alg && isAlgSupported(alg)) {
    return alg;
  } else if (kty === 'EC') {
    return getAlgFromEllipticCurveKey(crv);
  }

  throw new JOSENotSupported(
    `Unable to determine a supported algorithm for ${JSON.stringify({
      kty,
      alg,
      crv,
    })}`
  );
};

const getAlgFromEllipticCurveKey = (crv: JWK['crv']): SupportedAlgorithm => {
  switch (crv) {
    case 'P-256':
      return 'ES256';
    case 'P-384':
      return 'ES384';
    case 'P-512':
    case 'P-521': // https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet/blob/dev/src/Microsoft.IdentityModel.Tokens/JsonWebKeyECTypes.cs#L40
      return 'ES512';

    default:
      throw new JOSENotSupported(
        `Unsupported "crv" value for an elliptic curve key (${crv})`
      );
  }
};

// Coordinates length in bytes: bits/8
export const getCoordinateOctetLength = (alg: string) => {
  switch (alg.slice(2, 5)) {
    case '256':
      return 32;
    case '384':
      return 48;
    case '512':
      return 66;
    default:
      throw new JOSENotSupported(
        'Unsupported "alg" value for a JSON Web Key Set'
      );
  }
};
