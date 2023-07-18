#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(IoReactNativeJwt, NSObject)

RCT_EXTERN_METHOD(verify: (NSString)token
                  jwk: (NSDictionary *)jwk
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(unpackBerEncodedASN1: (NSString)signature
                  coordinateOctetLength: (NSInteger *)coordinateOctetLength
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(thumbprint: (NSDictionary)jwk
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(sha256: (NSString)toHash
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
