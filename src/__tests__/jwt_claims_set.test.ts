import type { JWSHeaderParameters, JWTPayload } from './../types';
import verifyJwtClaimSet from './../jwt_claims_set';
import { JWTClaimValidationFailed, JWTExpired } from './../utils/errors';

const now = new Date();
let addHours = (date: Date, hours: number) => {
  date.setHours(date.getHours() + hours);
  return date;
};

const jwtHeader: JWSHeaderParameters = {
  typ: 'jwt',
  kid: 'EC#1',
  alg: 'ES256',
};

const jwtPayload: JWTPayload = {
  iss: 'demo',
  sub: 'demo',
  iat: now.getTime() / 1000,
  exp: addHours(now, 2).getTime() / 1000,
};

describe('Basic JWT Claims Set verification', function () {
  it('must check the parameters correctly', async () => {
    const verified = verifyJwtClaimSet(jwtHeader, jwtPayload, {
      typ: 'jwt',
      requiredClaims: ['iss', 'sub'],
    });
    expect(verified).toBe(jwtPayload);
  });

  it('must fail the check because the JWT has expired', async () => {
    expect(() =>
      verifyJwtClaimSet(jwtHeader, jwtPayload, {
        currentDate: addHours(now, 10),
      })
    ).toThrowError(JWTExpired);
  });

  it('must fail the check because the typ is wrong', async () => {
    expect(() =>
      verifyJwtClaimSet(jwtHeader, jwtPayload, {
        typ: 'invalid',
      })
    ).toThrowError(JWTClaimValidationFailed);
  });
});
