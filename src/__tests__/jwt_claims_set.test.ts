import type { JWSHeaderParameters, JWTPayload } from 'src/types';
import verifyJwtClaimSet from './../jwt_claims_set';
import { JWTClaimValidationFailed, JWTExpired } from './../utils/errors';

const jwtHeader: JWSHeaderParameters = {
  typ: 'jwt',
  kid: 'EC#1',
  alg: 'ES256',
};

const jwtPayload: JWTPayload = {
  iss: 'demo',
  sub: 'demo',
  iat: 1689236635,
  exp: 1689240235,
};

describe('Basic JWT Claims Set verification', function () {
  it('must check the parameters correctly', async () => {
    let verified = verifyJwtClaimSet(jwtHeader, jwtPayload, {
      currentDate: new Date(2023, 6, 13, 10, 30, 0, 0),
      typ: 'jwt',
      requiredClaims: ['iss', 'sub'],
    });
    expect(verified).toBe(jwtPayload);
  });

  it('must fail the check because the JWT has expired', async () => {
    try {
      verifyJwtClaimSet(jwtHeader, jwtPayload);
    } catch (err) {
      expect(err).toBeInstanceOf(JWTExpired);
    }
  });

  it('must fail the check because the typ is wrong', async () => {
    try {
      verifyJwtClaimSet(jwtHeader, jwtPayload, {
        typ: 'invalid',
      });
    } catch (err) {
      expect(err).toBeInstanceOf(JWTClaimValidationFailed);
    }
  });
});
