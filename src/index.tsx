import { NativeModules, Platform } from 'react-native';
import type { JWK, JWTDecodeResult } from './types';

const LINKING_ERROR =
  `The package '@pagopa/io-react-native-jwt' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const IoReactNativeJwt = NativeModules.IoReactNativeJwt
  ? NativeModules.IoReactNativeJwt
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function decode(token: string): Promise<JWTDecodeResult> {
  return IoReactNativeJwt.decode(token);
}

export function verify(token: string, jwk: JWK): Promise<boolean> {
  return IoReactNativeJwt.verify(token, jwk);
}
