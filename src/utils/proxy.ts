import { NativeModules } from 'react-native';

export const IoReactNativeJwt = NativeModules.IoReactNativeJwt
  ? NativeModules.IoReactNativeJwt
  : new Proxy(
      {
        //this is a fake implementation to allow local deviceless testing
        unpackBerEncodedASN1: (a: string, _b: number) => a,
      },
      {
        get: function (target, prop) {
          return Reflect.get(target, prop);
        },
      }
    );
