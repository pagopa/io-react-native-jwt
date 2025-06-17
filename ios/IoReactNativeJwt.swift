import JOSESwift
import CommonCrypto
import Foundation


@objc(IoReactNativeJwt)
class IoReactNativeJwt: NSObject {

    // create an enum with error values
    enum HeaderError: Error {
      case invalidAlg(String)
      case invalidEnc(String)
    }

    func isECKey(jwk:NSDictionary) -> Bool{
        let kty = jwk["kty"] as! String
        return kty == "EC"
    }

    func getKeyManagmentAlg(header:NSDictionary) throws -> KeyManagementAlgorithm{
        let alg = header["alg"] as! String
        switch alg{
            case "RSA-OAEP":
                return KeyManagementAlgorithm.RSAOAEP
            case "RSA-OAEP-256":
                return KeyManagementAlgorithm.RSAOAEP256
            case "ECDH-ES":
                return KeyManagementAlgorithm.ECDH_ES
        default:
            throw HeaderError.invalidAlg("alg value not supported")
        }
    }

    func getContentEncryptionAlgorithm(header:NSDictionary) throws  -> ContentEncryptionAlgorithm{
        let enc = header["enc"] as! String
        switch enc{
            case "A128CBC-HS256":
                return ContentEncryptionAlgorithm.A128CBCHS256
            case "A256CBC-HS512":
                return ContentEncryptionAlgorithm.A256CBCHS512
            case "A256GCM":
                return ContentEncryptionAlgorithm.A256GCM
        default:
            throw HeaderError.invalidAlg("enc value not supported")
        }
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
                  verifier = Verifier(signatureAlgorithm: jws.header.algorithm!, key: publicKey)!
                } else {
                    let rsaJwk = try RSAPublicKey(data: publicKeyJson)
                    let publicKey = try rsaJwk.converted(to: SecKey.self)
                  verifier = Verifier(signatureAlgorithm: jws.header.algorithm!, key: publicKey)!
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

    @objc
    func enc(_ plaintext: String, header: NSDictionary, jwk: NSDictionary, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        do {
            let publicKeyJson = try JSONSerialization.data(withJSONObject: jwk, options:[] )
            let message = plaintext.data(using: .utf8)!

            if let content = header as? [String:AnyObject] {
                let jweHeader = try JWEHeader(parameters: content)
                let payload = Payload(message)

                if isECKey(jwk:jwk) {
                    // --- ECDH-ES / EC Key ---
                    let ecPublicKey = try ECPublicKey(data: publicKeyJson)
                    guard let encrypter = Encrypter(keyManagementAlgorithm: try getKeyManagmentAlg(header: header), contentEncryptionAlgorithm: try getContentEncryptionAlgorithm(header: header), encryptionKey: ecPublicKey)
                    else {
                      reject("Error", "Error creating Encrypter, incompatible key", nil)
                      return
                    }
                    
                    let jwe = try JWE(header: jweHeader, payload: payload, encrypter: encrypter)

                    resolve(jwe.compactSerializedString)
                } else {
                    let rsaJwk = try RSAPublicKey(data: publicKeyJson)
                    let publicKey = try rsaJwk.converted(to: SecKey.self)
                    guard let encrypter = Encrypter(keyManagementAlgorithm: try getKeyManagmentAlg(header: header), contentEncryptionAlgorithm: try getContentEncryptionAlgorithm(header: header), encryptionKey: publicKey)
                    else {
                      reject("Error", "Error creating Encrypter, incompatible key", nil)
                      return
                    }
                    let jwe = try JWE(header: jweHeader, payload: payload, encrypter: encrypter)

                    resolve(jwe.compactSerializedString)

                }

            } else {
                reject("Error", "Header is invalid", nil);
            }
        }

        catch {
            reject("Error", "\(error)", error);
        }


    }
}
