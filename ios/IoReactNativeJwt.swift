import JOSESwift

@objc(IoReactNativeJwt)
class IoReactNativeJwt: NSObject {
    

    func isECKey(jwk:NSDictionary) -> Bool{
        let kty = jwk["kty"] as! String
        return kty == "EC"
    }
    
    @objc
    func decode(_ token: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
      do {
          let jws = try JOSEDeserializer().deserialize(JWS.self, fromCompactSerialization: token)
          let jsonPayload = try JSONSerialization.jsonObject(with: jws.payload.data(), options: [])
          let headerPayload = try JSONSerialization.jsonObject(with: jws.header.data(), options: [])
          //let signature = [UInt8](jws.signature)
          resolve(["payload": jsonPayload, "protectedHeader": headerPayload])
      } catch {
          reject("Error", "\(error)", error);
      }
    }

    @objc
    func verify(_ token: String, jwk: NSDictionary, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        do {
            let jws = try JWS(compactSerialization: token)
            let publicKeyJson = try JSONSerialization.data(withJSONObject: jwk, options:[] )
            var verifier: Verifier?

            if isECKey(jwk:jwk) {
                let ecJwk = try ECPublicKey(data: publicKeyJson)
                let publicKey = try ecJwk.converted(to: SecKey.self)
                verifier = Verifier(verifyingAlgorithm: jws.header.algorithm!, key: publicKey)!
            } else {
                let rsaJwk = try RSAPublicKey(data: publicKeyJson)
                let publicKey = try rsaJwk.converted(to: SecKey.self)
                verifier = Verifier(verifyingAlgorithm: jws.header.algorithm!, key: publicKey)!
            }
            _ = try jws.validate(using: verifier!)
            resolve(true)

        } catch JOSESwiftError.verifyingFailed {
            resolve(false)
        }

        catch {
            reject("Error", "\(error)", error);
        }


    }
}
