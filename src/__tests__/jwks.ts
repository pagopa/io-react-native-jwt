import type { JWK } from '../types';
import { getJwkFromHeader } from '..';
import { JWKNotFound } from '../utils/errors';

const jwks: JWK[] = [
  {
    crv: 'P-256',
    kty: 'EC',
    x: 'qrJrj3Af_B57sbOIRrcBM7br7wOc8ynj7lHFPTeffUk',
    y: '1H0cWDyGgvU8w-kPKU_xycOCUNT2o0bwslIQtnPU6iM',
    kid: '#EC1',
  },
  {
    crv: 'P-256',
    kty: 'EC',
    x: '4HNptI-xr2pjyRJKGMnz4WmdnQD_uJSq4R95Nj98b44',
    y: 'LIZnSB39vFJhYgS3k7jXE4r3-CoGFQwZtPBIRqpNlrg',
    kid: '#EC2',
  },
  {
    kty: 'RSA',
    e: 'AQAB',
    use: 'sig',
    kid: '#RSA1',
    alg: 'RS256',
    n: 'gwZ0FqSsW18PufbHZBXijW4nEdIo5FLAt9MjDjzwCL9VXP4f9qs0c1mhzlgQtQ5GssqxkY1-APa1DA4LdhCaYzI5rKpRRPIqqgiTUErVtf2P36d0ZmjBdOQXumyGZjYSkQYSuMeTLVu_WZ9wg9O2V37DEcAqFwsbLVse1dvjv1Rz9nI_DoiXKMY7RozL560SK3V1gitPN1rx56Uc02t5eC6inmxSpZgs9Dhs61ntm0r6LVgRHmL0Mq8Q7waGqP9LSnA9t1E4Nn5CWvAkaqb2X6VsRJZBdkoxkPXwxi-PETfenVQk8A11Ppd9QFTlST8Tu5i5vZZkbuMDgNyH3ooAhQ',
  },
];

describe('getJwkFromHeader', function () {
  it('it should return the correct JWK with ES256', async () => {
    const header = {
      alg: 'ES256',
      kid: '#EC2',
    };
    const jwk = getJwkFromHeader(header, jwks);
    expect(jwk).toBe(jwks[1]);
  });
  it('it should return the correct JWK with RS256', async () => {
    const header = {
      alg: 'RS256',
      kid: '#RSA1',
    };
    const jwk = getJwkFromHeader(header, jwks);
    expect(jwk).toBe(jwks[2]);
  });
  it('it should fail with wrong kid', async () => {
    const header = {
      alg: 'ES256',
      kid: '#RSA1',
    };
    expect(() => getJwkFromHeader(header, jwks)).toThrowError(JWKNotFound);
  });
  it('it should fail with an invalid header', async () => {
    const header = {
      alg: 'ES256',
    };
    expect(() => getJwkFromHeader(header, jwks)).toThrowError(JWKNotFound);
  });
});
