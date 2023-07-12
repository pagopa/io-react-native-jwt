package com.pagopa.ioreactnativejwt

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import android.util.Base64
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

class IoReactNativeJwtModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  fun isECKey(jwk: JSONObject):Boolean {
    return jwk.get("kty") == "EC";
  }

  @ReactMethod
  fun decode(token:String, promise: Promise) {
    try {
            val signedJWT = SignedJWT.parse(token)
            val claimsSet = convertJsonToMap(JSONObject(signedJWT.payload.toJSONObject()))
            val header = convertJsonToMap(JSONObject(signedJWT.header.toJSONObject()))
            val result = WritableNativeMap().apply {
                putMap("payload", claimsSet)
                putMap("protectedHeader", header)
            }
            promise.resolve(result)
        } catch (ex: Exception) {
            promise.reject(ex)
        }
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


  companion object {
    const val NAME = "IoReactNativeJwt"
  }
}
