import { JWTInvalid } from '../utils/errors';
import type { JWTPayload } from '../types';
import { UnsecuredJWT } from '../unsecured';

const jwtPayload: JWTPayload = {
  iss: 'demo',
  sub: 'demo',
  iat: 1675206000,
  exp: 1706742000,
};

const encodedUnsecureJwt =
  'eyJhbGciOiJub25lIn0.eyJpc3MiOiJkZW1vIiwic3ViIjoiZGVtbyIsImlhdCI6MTY3NTIwNjAwMCwiZXhwIjoxNzA2NzQyMDAwfQ.';

describe('Unsecured JWT', function () {
  it('it should be encoded correctly', async () => {
    const unsecured = new UnsecuredJWT(jwtPayload).encode();
    expect(unsecured).toBe(encodedUnsecureJwt);
  });
  it('it should fail encoding with unknown payload', async () => {
    expect(() =>
      new UnsecuredJWT('' as unknown as JWTPayload).encode()
    ).toThrowError(TypeError);
  });
  it('it should be decoded correctly', async () => {
    const unsecured = UnsecuredJWT.decode(encodedUnsecureJwt, {
      currentDate: new Date(2023, 7, 14, 0, 0),
    });
    expect(unsecured.payload).toMatchObject(jwtPayload);
  });
  it('it should fail the decode with an empty string', async () => {
    expect(() => UnsecuredJWT.decode('')).toThrowError(JWTInvalid);
  });
  it('it should return the right content to sign', async () => {
    const toSign = new UnsecuredJWT(jwtPayload).toSign();
    expect(toSign).toBe(
      'eyJpc3MiOiJkZW1vIiwic3ViIjoiZGVtbyIsImlhdCI6MTY3NTIwNjAwMCwiZXhwIjoxNzA2NzQyMDAwfQ'
    );
  });
});
