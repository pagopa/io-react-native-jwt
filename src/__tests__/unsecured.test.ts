import { JWTInvalid } from '../utils/errors';
import type { JWTPayload } from '../types';
import { UnsecuredJWT } from '../jwt/unsecured';

const jwtPayload: JWTPayload = {
  iss: 'demo',
  sub: 'demo',
  iat: 1675206000,
  exp: 32512187377,
};

const encodedUnsecureJwt =
  'eyJhbGciOiJub25lIn0.eyJpc3MiOiJkZW1vIiwic3ViIjoiZGVtbyIsImlhdCI6MTY3NTIwNjAwMCwiZXhwIjozMjUxMjE4NzM3N30.';

const encodedSecuredJwt =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTM4MTY4OTEsImV4cCI6MTcyNTM1Mjg5MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.27lkkQduvc_SCmOLzlF6wFhoiUh0eC9g-30MuBERqcI';
const encodedJwtWithAlg =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTM4MTY4OTEsImV4cCI6MTcyNTM1Mjg5MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0';

describe('Unsecured JWT', function () {
  it('it should be encoded correctly', async () => {
    const unsecured = new UnsecuredJWT().setPayload(jwtPayload).encode();
    expect(unsecured).toBe(encodedUnsecureJwt);
  });
  it('it should decode and unsecured jwt', async () => {
    const result = UnsecuredJWT.decode(encodedUnsecureJwt);
    expect(result).toEqual(
      expect.objectContaining({
        header: { alg: 'none' },
        payload: expect.any(Object),
      })
    );
  });
  it('it should fail decoding a secured jwt', async () => {
    expect(() => UnsecuredJWT.decode(encodedSecuredJwt)).toThrowError(
      JWTInvalid
    );
  });

  it('it should fail decoding an unsecured jwt with alg != none', async () => {
    expect(() => UnsecuredJWT.decode(encodedJwtWithAlg)).toThrowError(
      JWTInvalid
    );
  });
  it('it should fail encoding with unknown payload', async () => {
    expect(() =>
      new UnsecuredJWT().setPayload('' as unknown as JWTPayload).encode()
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
});
