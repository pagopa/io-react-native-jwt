import { JOSENotSupported } from '../utils/errors';
import { getAlgFromKey, supportedAlgorithms } from '../algorithms';

describe('getAlgFromKey', () => {
  const allSupportedRsaKeys = supportedAlgorithms.map((alg) => ({
    kty: 'RSA',
    alg,
  }));
  it.each(allSupportedRsaKeys.map((k) => [k]))(
    'should use the given algorithm for RSA keys if the algorithm is supported (%o)',
    (key) => {
      expect(getAlgFromKey(key)).toBe(key.alg);
    }
  );

  it.each`
    key                            | expected
    ${{ kty: 'EC', crv: 'P-256' }} | ${'ES256'}
    ${{ kty: 'EC', crv: 'P-384' }} | ${'ES384'}
    ${{ kty: 'EC', crv: 'P-512' }} | ${'ES512'}
    ${{ kty: 'EC', crv: 'P-521' }} | ${'ES512'}
  `(
    'should get correct algorithm for elliptic keys ($key.crv)',
    ({ key, expected }) => {
      expect(getAlgFromKey(key)).toBe(expected);
    }
  );

  it.each`
    scenario                  | key
    ${'unsupported key type'} | ${{ kty: 'unsupported' }}
    ${'unsupported crv'}      | ${{ kty: 'EC', crv: 'unsupported' }}
    ${'unsupported alg'}      | ${{ kty: 'RSA', alg: 'unsupported' }}
    ${'bad rsa'}              | ${{ kty: 'RSA', crv: 'P-256' }}
    ${'bad ec'}               | ${{ kty: 'EC', alg: 'RS256' }}
  `('should fail on invalid or unsupported key ($scenario)', ({ key }) => {
    expect(() => getAlgFromKey(key)).toThrow(JOSENotSupported);
  });
});
