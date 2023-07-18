package com.pagopa.ioreactnativejwt

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import android.util.Base64
import android.util.Base64.DEFAULT
import com.nimbusds.jose.JWSHeader
import com.nimbusds.jose.crypto.RSASSASigner
import com.nimbusds.jose.crypto.bc.BouncyCastleProviderSingleton
import com.nimbusds.jose.jwk.RSAKey
import com.nimbusds.jose.jwk.ECKey
import com.nimbusds.jwt.JWTClaimsSet
import com.nimbusds.jwt.SignedJWT
import com.facebook.react.bridge.ReadableMap
import org.json.JSONObject
import com.nimbusds.jose.crypto.RSASSAVerifier
import com.nimbusds.jose.crypto.ECDSAVerifier
import com.facebook.react.bridge.WritableNativeMap
import com.nimbusds.jose.crypto.impl.RSA_OAEP
import com.pagopa.ioreactnativejwt.Utils.convertJsonToMap
import com.nimbusds.jose.crypto.impl.ECDSA.transcodeSignatureToConcat
import java.security.MessageDigest

class IoReactNativeJwtModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  fun isECKey(jwk: JSONObject):Boolean {
    return jwk.get("kty") == "EC";
  }

  @ReactMethod
  fun verify(token: String, jwk: ReadableMap, promise: Promise) {
    try {
      val signedJWT = SignedJWT.parse(token)
      val jwkJson = JSONObject(jwk.toHashMap())
      var isValid = false

      if (isECKey(jwkJson)) {
        val internalJwk = ECKey.parse(jwkJson.toString())
        val verifier = ECDSAVerifier(internalJwk)
        verifier.jcaContext.provider = BouncyCastleProviderSingleton.getInstance()
        isValid = signedJWT.verify(verifier)
      } else {
        val internalJwk = RSAKey.parse(jwkJson.toString())
        val verifier = RSASSAVerifier(internalJwk)
        verifier.jcaContext.provider = BouncyCastleProviderSingleton.getInstance()
        isValid = signedJWT.verify(verifier)
      }
      promise.resolve(isValid)

    } catch (ex: Exception) {
      promise.reject(ex)
    }
  }

  @ReactMethod
  fun thumbprint(jwk: ReadableMap, promise: Promise) {
    try {
      val jwkJson = JSONObject(jwk.toHashMap())
      var thumbprint = ""
      if (isECKey(jwkJson)) {
        val internalJwk = ECKey.parse(jwkJson.toString())
        thumbprint = internalJwk.computeThumbprint().toString();
      } else {
        val internalJwk = RSAKey.parse(jwkJson.toString())
        thumbprint = internalJwk.computeThumbprint().toString();
      }
      if (thumbprint != "") {
        promise.resolve(thumbprint)
      } else {
        promise.reject(Exception("Unable to create thumbprint"))
      }

    } catch (ex: Exception) {
      promise.reject(ex)
    }
  }

  @ReactMethod
  fun unpackBerEncodedASN1(asn1Signature: String, coordinateOctetLength: Int, promise: Promise) {
    try {
      val decodedBytes = Base64.decode(asn1Signature, DEFAULT)
      val transcoded = transcodeSignatureToConcat(decodedBytes, coordinateOctetLength)
      val signature = Base64.encodeToString(transcoded, DEFAULT)
      promise.resolve(signature)
    } catch (ex: Exception) {
      promise.reject(ex)
    }
  }

  @ReactMethod
  fun sha256(toHash: String, promise: Promise) {
    try {
      val digest = MessageDigest.getInstance("SHA-256")
      val hashBytes = digest.digest(toHash.toByteArray(Charsets.UTF_8))
      val base64String = Base64.encodeToString(hashBytes, Base64.NO_WRAP)
      promise.resolve(base64String)
    } catch (ex: Exception) {
      promise.reject(ex)
    }
  }


  companion object {
    const val NAME = "IoReactNativeJwt"
  }
}
