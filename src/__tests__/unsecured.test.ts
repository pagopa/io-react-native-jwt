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
  'eyJhbGciOiJub25lIn0=.eyJpc3MiOiJkZW1vIiwic3ViIjoiZGVtbyIsImlhdCI6MTY3NTIwNjAwMCwiZXhwIjoxNzA2NzQyMDAwfQ==.';

describe('Unsecured JWT', function () {
  it('must be encoded correctly', async () => {
    let unsecured = new UnsecuredJWT(jwtPayload).encode();
    expect(unsecured).toBe(encodedUnsecureJwt);
  });
  it('must fail the encode', async () => {
    expect(() =>
      new UnsecuredJWT('' as unknown as JWTPayload).encode()
    ).toThrowError(TypeError);
  });
  it('must be decoded correctly', async () => {
    let unsecured = UnsecuredJWT.decode(encodedUnsecureJwt, {
      currentDate: new Date(2023, 7, 14, 0, 0),
    });
    expect(unsecured.payload).toMatchObject(jwtPayload);
  });
  it('must fail the decode', async () => {
    expect(() => UnsecuredJWT.decode('')).toThrowError(JWTInvalid);
  });
  it('must return content to sign', async () => {
    let toSign = new UnsecuredJWT(jwtPayload).toSign();
    expect(toSign).toBe(
      'eyJpc3MiOiJkZW1vIiwic3ViIjoiZGVtbyIsImlhdCI6MTY3NTIwNjAwMCwiZXhwIjoxNzA2NzQyMDAwfQ=='
    );
  });
});
