import { IoReactNativeJwt } from '../utils/proxy';
import type { WithJWKS, JWK } from '../types';
import { JWKSetInvalid } from '../utils/errors';
import { decode } from '..';

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

/**
 * Returns a JSON Web Key Set (JWKS) downloaded from a remote endpoint,
 * that is, for example, an OAuth 2.0 or OIDC jwks_uri.
 *
 * @param url URL string to fetch the JSON Web Key Set from.
 * @param appFetch fetch function (optional)
 */
export const getRemoteJWKSet = async (
  url: string,
  appFetch: GlobalFetch['fetch'] = fetch
): Promise<JWK[]> => {
  let response = await appFetch(url);

  if (response.status === 200) {
    let jwt = await response.text();
    let { payload } = await decode(jwt);

    let metadata = payload as unknown as WithJWKS;
    if (metadata.jwks && metadata.jwks.keys) {
      return metadata.jwks.keys;
    } else {
      throw new JWKSetInvalid(`Unable to decode JWKSet metadata`);
    }
  }

  throw new JWKSetInvalid(
    `Unable to obtain JWKSet from given url. Response status: ${response.status}`
  );
};
