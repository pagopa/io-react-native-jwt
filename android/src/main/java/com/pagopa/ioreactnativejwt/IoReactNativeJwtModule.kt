package com.pagopa.ioreactnativejwt

import android.util.Base64
import android.util.Base64.DEFAULT
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.nimbusds.jose.JOSEObject
import com.nimbusds.jose.JWEEncrypter
import com.nimbusds.jose.JWEHeader
import com.nimbusds.jose.JWEObject
import com.nimbusds.jose.JWSHeader
import com.nimbusds.jose.Payload
import com.nimbusds.jose.crypto.ECDHEncrypter
import com.nimbusds.jose.crypto.ECDSAVerifier
import com.nimbusds.jose.crypto.RSAEncrypter
import com.nimbusds.jose.crypto.RSASSAVerifier
import com.nimbusds.jose.crypto.bc.BouncyCastleProviderSingleton
import com.nimbusds.jose.crypto.impl.ECDSA.transcodeSignatureToConcat
import com.nimbusds.jose.jwk.ECKey
import com.nimbusds.jose.jwk.JWK
import com.nimbusds.jose.jwk.RSAKey
import com.nimbusds.jose.util.JSONObjectUtils
import com.nimbusds.jose.util.StandardCharset
import org.json.JSONObject
import java.security.MessageDigest
import java.text.ParseException


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

      val parts = JOSEObject.split(token)
      if (parts.size != 3) {
        throw ParseException("Unexpected number of Base64URL parts, must be three", 0)
      }

      val headerString = parts[0]
      val headerJson = JSONObjectUtils.parse(headerString.decodeToString(), -1);
      val header = JWSHeader.parse(headerJson, headerString);

      val payload = Payload(parts[1])
      val signature = parts[2]

      var signingInput = header.toBase64URL().toString() + '.' + payload.toBase64URL().toString();
      val signingInputByteArray = signingInput.toByteArray(StandardCharset.UTF_8)
      val jwkJson = JSONObject(jwk.toHashMap() as Map<*, *>?)
      var isValid = false

      if (isECKey(jwkJson)) {
        val internalJwk = ECKey.parse(jwkJson.toString())
        val verifier = ECDSAVerifier(internalJwk)
        verifier.jcaContext.provider = BouncyCastleProviderSingleton.getInstance()
        isValid = verifier.verify(header, signingInputByteArray, signature);
      } else {
        val internalJwk = RSAKey.parse(jwkJson.toString())
        val verifier = RSASSAVerifier(internalJwk)
        verifier.jcaContext.provider = BouncyCastleProviderSingleton.getInstance()
        isValid = verifier.verify(header, signingInputByteArray, signature);
      }
      promise.resolve(isValid)

    } catch (ex: Exception) {
      promise.reject(ex)
    }
  }

  @ReactMethod
  fun thumbprint(jwk: ReadableMap, promise: Promise) {
    try {
      val jwkJson = JSONObject(jwk.toHashMap() as Map<*, *>?)
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


  @ReactMethod
  fun enc(token: String, header: ReadableMap, jwk: ReadableMap, promise: Promise) {
    try {
      val jwkJson = JSONObject(jwk.toHashMap() as Map<*, *>?)
      val headerJson = JSONObject(header.toHashMap() as Map<*, *>?)
      val payload = Payload(token)
      val internalHeader = JWEHeader.parse(headerJson.toString())

      val publicKey: JWK = JWK.parse(jwkJson.toString())
      val encrypter: JWEEncrypter = when (publicKey) {
        is ECKey -> ECDHEncrypter(publicKey)
        is RSAKey -> RSAEncrypter(publicKey)
        else -> throw IllegalArgumentException("Unsupported key type for encryption")
      }

      val jweObject = JWEObject(internalHeader, payload)
      jweObject.encrypt(encrypter)
      promise.resolve(jweObject.serialize())
    } catch (ex: Exception) {
      promise.reject(ex)
    }
  }

  companion object {
    const val NAME = "IoReactNativeJwt"
  }
}
