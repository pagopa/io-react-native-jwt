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
});
