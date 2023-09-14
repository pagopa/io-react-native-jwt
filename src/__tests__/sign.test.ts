import type { JWTPayload } from '../types';
import { SignJWT } from '../jwt/sign';

const jwtPayload: JWTPayload = {
  iss: 'demo',
  sub: 'demo',
  iat: 1675206000,
  exp: 1706742000,
};

const jwtHeader = {
  typ: 'jwt',
};

const pk0 = {
  crv: 'P-256',
  kty: 'EC',
  x: '4HNptI-xr2pjyRJKGMnz4WmdnQD_uJSq4R95Nj98b44',
  y: 'LIZnSB39vFJhYgS3k7jXE4r3-CoGFQwZtPBIRqpNlrg',
  kid: '#EC2',
};

const pk1 = {
  kty: 'RSA',
  e: 'AQAB',
  use: 'sig',
  kid: '#RSA1',
  alg: 'RS256',
  n: 'gwZ0FqSsW18PufbHZBXijW4nEdIo5FLAt9MjDjzwCL9VXP4f9qs0c1mhzlgQtQ5GssqxkY1-APa1DA4LdhCaYzI5rKpRRPIqqgiTUErVtf2P36d0ZmjBdOQXumyGZjYSkQYSuMeTLVu_WZ9wg9O2V37DEcAqFwsbLVse1dvjv1Rz9nI_DoiXKMY7RozL560SK3V1gitPN1rx56Uc02t5eC6inmxSpZgs9Dhs61ntm0r6LVgRHmL0Mq8Q7waGqP9LSnA9t1E4Nn5CWvAkaqb2X6VsRJZBdkoxkPXwxi-PETfenVQk8A11Ppd9QFTlST8Tu5i5vZZkbuMDgNyH3ooAhQ',
};

const mockCrypto = {
  getPublicKey: jest.fn(async () => pk0 /* just the first */),
  getSignature: jest.fn(
    async () =>
      '6wA0M6rNYNSFN_EylzMA6ElAibW7FVSZyoLNEkHU5c_RKuiNenT08YIMvbysYautLZotUedEMP5xCyNpY34x6Q'
  ),
};

describe('Sign JWT', function () {
  it('it should be signed correctly', async () => {
    const signedJwt = await new SignJWT(mockCrypto)
      .setPayload(jwtPayload)
      .setProtectedHeader(jwtHeader)
      .sign();

    expect(signedJwt).toBe(
      'eyJ0eXAiOiJqd3QiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJkZW1vIiwic3ViIjoiZGVtbyIsImlhdCI6MTY3NTIwNjAwMCwiZXhwIjoxNzA2NzQyMDAwfQ.6wA0M6rNYNSFN_EylzMA6ElAibW7FVSZyoLNEkHU5c_RKuiNenT08YIMvbysYautLZotUedEMP5xCyNpY34x6Q'
    );
  });

  it('it should ignore a passed alg', async () => {
    const signed = await new SignJWT(mockCrypto)
      .setPayload(jwtPayload)
      .setProtectedHeader({ alg: 'RS512' /* any alg */ })
      .sign();

    const decoded = SignJWT.decode(signed);

    expect(decoded.protectedHeader.alg).not.toEqual('RS512');
  });

  it.each`
    key    | expected
    ${pk0} | ${'ES256'}
    ${pk1} | ${'RS256'}
  `(
    'it should select the right signing algorithm for the used key ($key.kid)',
    async ({ key, expected }) => {
      mockCrypto.getPublicKey.mockImplementationOnce(async () => key);
      const signed = await new SignJWT(mockCrypto)
        .setPayload(jwtPayload)
        .setProtectedHeader(jwtHeader)
        .sign();

      const decoded = SignJWT.decode(signed);

      expect(decoded.protectedHeader.alg).toEqual(expected);
    }
  );
});
