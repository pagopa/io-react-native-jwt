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
