package com.pagopa.ioreactnativejwt;


import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JOSEObject;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.util.Base64URL;
import com.nimbusds.jose.util.JSONObjectUtils;
import com.nimbusds.jose.util.StandardCharset;
import net.jcip.annotations.ThreadSafe;

import java.text.ParseException;
import java.util.Map;



@ThreadSafe
public class CustomSignedJWT extends JOSEObject {

  private static final long serialVersionUID = 1L;

  private final JWSHeader header;
  private final String signingInputString;
  private Base64URL signature;


  public CustomSignedJWT(final JWSHeader header, final Payload payload, final Base64URL signature) throws ParseException {

    if (header == null) {
      throw new IllegalArgumentException("The JWS header must not be null");
    }
    this.header = header;

    if (payload == null) {
      throw new IllegalArgumentException("The payload must not be null");
    }
    setPayload(payload);

    signingInputString = composeSigningInput();
    if (signature == null) {
      throw new IllegalArgumentException("The third part must not be null");
    }
    if (signature.toString().trim().isEmpty()) {
      throw new ParseException("The signature must not be empty", 0);
    }

    this.signature = signature;
  }



  @Override
  public JWSHeader getHeader() {
    return header;
  }


  private String composeSigningInput() {
    if (header.isBase64URLEncodePayload()) {
      return getHeader().toBase64URL().toString() + '.' + getPayload().toBase64URL().toString();
    } else {
      return getHeader().toBase64URL().toString() + '.' + getPayload().toString();
    }
  }

  public byte[] getSigningInput() {
    return signingInputString.getBytes(StandardCharset.UTF_8);
  }


  public Base64URL getSignature() {
    return signature;
  }

  public synchronized boolean verify(final JWSVerifier verifier)
    throws JOSEException {
    boolean verified;
    try {
      verified = verifier.verify(getHeader(), getSigningInput(), getSignature());
    } catch (JOSEException e) {
      throw e;

    } catch (Exception e) {
      throw new JOSEException(e.getMessage(), e);
    }

    return verified;
  }


  @Override
  public String serialize() {
    return serialize(false);
  }


  public String serialize(final boolean detachedPayload) {

    if (detachedPayload) {
      return header.toBase64URL().toString() + '.' + '.' + signature.toString();
    }
    return signingInputString + '.' + signature.toString();
  }

  public static CustomSignedJWT parse(final String s)
    throws ParseException {

    Base64URL[] parts = JOSEObject.split(s);

    if (parts.length != 3) {
      throw new ParseException("Unexpected number of Base64URL parts, must be three", 0);
    }

    Base64URL header = parts[0];
    Base64URL payload = parts[1];
    Base64URL signature = parts[2];

    //-1 is the sizeLimit, the max allowed size of the string to parse. A negative integer means no limit.
    Map<String, Object> headerJson = JSONObjectUtils.parse(header.decodeToString(), -1);
    JWSHeader jwsHeader = JWSHeader.parse(headerJson, header);

    return new CustomSignedJWT(jwsHeader, new Payload(payload), signature);
  }

}
