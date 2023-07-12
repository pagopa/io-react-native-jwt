import JOSESwift

@objc(IoReactNativeJwt)
class IoReactNativeJwt: NSObject {

  @objc(multiply:withB:withResolver:withRejecter:)
  func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    resolve(a*b)
  }


  @objc
    func decode(_ token: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
      do {
          let jws = try JOSEDeserializer().deserialize(JWS.self, fromCompactSerialization: token)
          let jsonPayload = try JSONSerialization.jsonObject(with: jws.payload.data(), options: [])
          let headerPayload = try JSONSerialization.jsonObject(with: jws.header.data(), options: [])
       let signature = [UInt8](jws.signature)
        resolve(["payload": jsonPayload, "protectedHeader": headerPayload])
      } catch {
          reject("Error", "\(error)", error);
      }
    }
}
