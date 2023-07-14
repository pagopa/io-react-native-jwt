import type { JWSHeaderParameters, JWTPayload } from '../types';
import { SignJWT } from '../sign';
import { JOSEError } from '../utils/errors';

const jwtPayload: JWTPayload = {
  iss: 'demo',
  sub: 'demo',
  iat: 1675206000,
  exp: 1706742000,
};

const jwtHeader: JWSHeaderParameters = {
  typ: 'jwt',
  kid: 'EC#1',
  alg: 'ES256',
};

const signature =
  '6wA0M6rNYNSFN_EylzMA6ElAibW7FVSZyoLNEkHU5c_RKuiNenT08YIMvbysYautLZotUedEMP5xCyNpY34x6Q';

describe('Sign JWT', function () {
  it('must be signed correctly', async () => {
    let signedJwt = new SignJWT(jwtPayload)
      .setProtectedHeader(jwtHeader)
      .sign(signature);
    expect(signedJwt).toBe(
      'eyJ0eXAiOiJqd3QiLCJraWQiOiJFQyMxIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJkZW1vIiwic3ViIjoiZGVtbyIsImlhdCI6MTY3NTIwNjAwMCwiZXhwIjoxNzA2NzQyMDAwfQ.6wA0M6rNYNSFN_EylzMA6ElAibW7FVSZyoLNEkHU5c_RKuiNenT08YIMvbysYautLZotUedEMP5xCyNpY34x6Q'
    );
  });
  it('signature must fail', async () => {
    expect(() =>
      new SignJWT(jwtPayload).setProtectedHeader(jwtHeader).sign('')
    ).toThrowError(JOSEError);
  });
});
