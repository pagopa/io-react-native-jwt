import JOSESwift
import CommonCrypto

@objc(IoReactNativeJwt)
class IoReactNativeJwt: NSObject {


    func isECKey(jwk:NSDictionary) -> Bool{
        let kty = jwk["kty"] as! String
        return kty == "EC"
    }

    @objc
    func verify(_ token: String, jwk: NSDictionary, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        do {
            let jws = try JWS(compactSerialization: token)
            let publicKeyJson = try JSONSerialization.data(withJSONObject: jwk, options:[] )
            var verifier: Verifier?
            if jws.header.algorithm == nil {
                reject("Error", "Invalid algorithm", nil);
            } else {
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
            }


        } catch JOSESwiftError.verifyingFailed {
            resolve(false)
        }

        catch {
            reject("Error", "\(error)", error);
        }


    }

    @objc
    func unpackBerEncodedASN1(_ signature: String, coordinateOctetLength: Int, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        do {
            let signatureData = Data(base64Encoded: signature)

            let ecSignatureTLV = [UInt8](signatureData!)
            let ecSignature = try ecSignatureTLV.read(.sequence)
            let varlenR = try Data(ecSignature.read(.integer))
            let varlenS = try Data(ecSignature.skip(.integer).read(.integer))
            let fixlenR = Asn1IntegerConversion.toRaw(varlenR, of: coordinateOctetLength)
            let fixlenS = Asn1IntegerConversion.toRaw(varlenS, of: coordinateOctetLength)
            let sign = fixlenR + fixlenS
            resolve(String(
                decoding: Data(sign).base64EncodedData(),
                as: UTF8.self
              ))

        }
        catch {
            reject("Error", "\(error)", error);
        }
    }

    // Converting integers to and from DER encoded ASN.1 as described here:
    // https://docs.microsoft.com/en-us/windows/desktop/seccertenroll/about-integer
    // This conversion is required because the Secure Enclave only supports generating ASN.1 encoded signatures,
    // while the JWS Standard requires raw signatures, where the R and S are unsigned integers with a fixed length:
    // https://github.com/airsidemobile/JOSESwift/pull/156#discussion_r292370209
    // https://tools.ietf.org/html/rfc7515#appendix-A.3.1
    internal struct Asn1IntegerConversion {
        static func toRaw(_ data: Data, of fixedLength: Int) -> Data {
            let varLength = data.count
            if varLength > fixedLength + 1 {
                fatalError("ASN.1 integer is \(varLength) bytes long when it should be < \(fixedLength + 1).")
            }
            if varLength == fixedLength + 1 {
                assert(data.first == 0)
                return data.dropFirst()
            }
            if varLength == fixedLength {
                return data
            }
            if varLength < fixedLength {
                // pad to fixed length using 0x00 bytes
                return Data(count: fixedLength - varLength) + data
            }
            fatalError("Unable to parse ASN.1 integer. This should be unreachable.")
        }

        static func fromRaw(_ data: Data) -> Data {
            assert(data.count > 0)
            let msb: UInt8 = 0b1000_0000
            // drop all leading zero bytes
            let varlen = data.drop { $0 == 0}
            guard let firstNonZero = varlen.first else {
                // all bytes were zero so the encoded value is zero
                return Data(count: 1)
            }
            if (firstNonZero & msb) == msb {
                return Data(count: 1) + varlen
            }
            return varlen
        }
    }

    @objc
    func thumbprint(_ jwk: NSDictionary, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        do {
            let publicKeyJson = try JSONSerialization.data(withJSONObject: jwk, options:[] )
            var thumbprint: String?
            if isECKey(jwk:jwk) {
                let ecJwk = try ECPublicKey(data: publicKeyJson)
                thumbprint = try ecJwk.thumbprint()
            } else {
                let rsaJwk = try RSAPublicKey(data: publicKeyJson)
                thumbprint = try rsaJwk.thumbprint()
            }
            resolve(thumbprint)
        }
        catch {
            reject("Error", "\(error)", error);
        }
    }

    @objc
    func sha256(_ toHash: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        
         let inputData = toHash.data(using: .utf8)
        if (inputData != nil){
            
            
            var digest = [UInt8](repeating: 0, count: Int(CC_SHA256_DIGEST_LENGTH))
            
            _ = inputData!.withUnsafeBytes { (bytes: UnsafeRawBufferPointer) in
                if let pointer = bytes.baseAddress?.assumingMemoryBound(to: UInt8.self) {
                    CC_SHA256(pointer, CC_LONG(inputData!.count), &digest)
                }
            }
            
            var sha256String = ""
            for byte in digest {
                sha256String += String(format: "%02x", byte)
            }
            
            resolve(String(
                decoding: Data(digest).base64EncodedData(),
                as: UTF8.self
              ))
            //resolve(sha256String)
        } else {
            reject("Error", "Unable to parse string to hash", nil);
        }
        
       
    }


}
