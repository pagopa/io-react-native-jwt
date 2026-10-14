import { NativeModules } from 'react-native';

const nativeModule = {
  enc: jest.fn().mockResolvedValue('jwe'),
  sha256: jest.fn().mockResolvedValue('hash'),
  thumbprint: jest.fn().mockResolvedValue('thumbprint'),
  unpackBerEncodedASN1: jest.fn().mockResolvedValue('signature'),
  verify: jest.fn().mockResolvedValue(true),
};

NativeModules.IoReactNativeJwt = nativeModule;

const lib = require('../index') as typeof import('../index');

const jwk = { kty: 'EC', crv: 'P-256', x: 'x', y: 'y' };

beforeEach(() => jest.clearAllMocks());

describe('io-react-native-jwt', () => {
  it.each([
    ['verify', ['token', jwk], true],
    ['unpackBerEncodedASN1', ['der', 32], 'signature'],
    ['thumbprint', [jwk], 'thumbprint'],
    ['sha256', ['value'], 'hash'],
    ['enc', ['plaintext', { alg: 'ECDH-ES', enc: 'A256GCM' }, jwk], 'jwe'],
  ] as const)(
    '%s forwards the arguments to the native module',
    async (name, args, expected) => {
      const fn = lib[name] as (...a: readonly unknown[]) => Promise<unknown>;
      await expect(fn(...args)).resolves.toEqual(expected);
      expect(nativeModule[name]).toHaveBeenCalledWith(...args);
    }
  );

  it.each([
    ['verify', ['token', { crv: 'P-256' }]],
    ['unpackBerEncodedASN1', ['der', 0]],
    ['thumbprint', [{ kty: 1 }]],
    ['sha256', [42]],
    ['enc', ['plaintext', { alg: 'none', enc: 'A256GCM' }, jwk]],
    ['enc', ['plaintext', { alg: 'ECDH-ES' }, jwk]],
  ] as const)(
    '%s rejects invalid arguments without calling the native module',
    async (name, args) => {
      const fn = lib[name] as (...a: readonly unknown[]) => Promise<unknown>;
      await expect(fn(...args)).rejects.toThrow();
      expect(nativeModule[name]).not.toHaveBeenCalled();
    }
  );

  it('rejects unexpected native results', async () => {
    nativeModule.thumbprint.mockResolvedValueOnce(undefined);
    await expect(lib.thumbprint(jwk)).rejects.toThrow();
  });

  it('keeps additional JWE header parameters', async () => {
    const header = { alg: 'ECDH-ES', enc: 'A256GCM', kid: 'kid' } as const;
    await lib.enc('plaintext', header, jwk);
    expect(nativeModule.enc).toHaveBeenCalledWith('plaintext', header, jwk);
  });
});
