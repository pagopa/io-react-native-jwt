import { IoReactNativeJwt } from '../utils/proxy';
import type { JWK } from '../types';

/**
 * Calculate JWK thumbprint
 *
 * @example Get JWK thumbprint
 *
 * ```js
 * const jwk: JWK = {
 *   crv: 'P-256',
 *   kty: 'EC',
 *   x: 'qrJrj3Af_B57sbOIRrcBM7br7wOc8ynj7lHFPTeffUk',
 *   y: '1H0cWDyGgvU8w-kPKU_xycOCUNT2o0bwslIQtnPU6iM',
 * };

 * const thumbprint = await thumbprint(jwk)
 *
 * ```
 *
 * @param jwk JSON Web Key
 */
export const thumbprint = (jwk: JWK): Promise<string> =>
  IoReactNativeJwt.thumbprint(jwk);
