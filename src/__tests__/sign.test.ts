import type { CompactJWSHeaderParameters, JWTPayload } from '../types';
import { SignJWT } from '../sign';
import { JOSENotSupported, JWSInvalid } from '../utils/errors';

const jwtPayload: JWTPayload = {
  iss: 'demo',
  sub: 'demo',
  iat: 1675206000,
  exp: 1706742000,
};

const jwtHeader: CompactJWSHeaderParameters = {
  typ: 'jwt',
  kid: 'EC#1',
  alg: 'ES256',
};

const signature =
  '6wA0M6rNYNSFN_EylzMA6ElAibW7FVSZyoLNEkHU5c_RKuiNenT08YIMvbysYautLZotUedEMP5xCyNpY34x6Q';

let toSign = new SignJWT(jwtPayload).setProtectedHeader(jwtHeader).toSign();

describe('Sign JWT', function () {
  it('it should be signed correctly', async () => {
    let signedJwt = await SignJWT.appendSignature(toSign, signature);
    expect(signedJwt).toBe(
      'eyJ0eXAiOiJqd3QiLCJraWQiOiJFQyMxIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJkZW1vIiwic3ViIjoiZGVtbyIsImlhdCI6MTY3NTIwNjAwMCwiZXhwIjoxNzA2NzQyMDAwfQ.6wA0M6rNYNSFN_EylzMA6ElAibW7FVSZyoLNEkHU5c_RKuiNenT08YIMvbysYautLZotUedEMP5xCyNpY34x6Q'
    );
  });
  it('it should fails with invalid alg', async () => {
    expect(() =>
      new SignJWT(jwtPayload).setProtectedHeader({ alg: 'invalid' })
    ).toThrowError(JOSENotSupported);
  });
  it('it should fails without header', async () => {
    expect(() => new SignJWT(jwtPayload).toSign()).toThrowError(JWSInvalid);
  });
});
