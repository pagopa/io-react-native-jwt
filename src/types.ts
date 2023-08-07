export interface JWTDecodeResult {
  /** JWT Claims Set. */
  payload: JWTPayload;

  /** JWS Protected Header. */
  protectedHeader: JWSHeaderParameters;
}

export interface JoseHeaderParameters {
  /** "kid" (Key ID) Header Parameter. */
  kid?: string;

  /** "x5t" (X.509 Certificate SHA-1 Thumbprint) Header Parameter. */
  x5t?: string;

  /** "x5c" (X.509 Certificate Chain) Header Parameter. */
  x5c?: string[];

  /** "x5u" (X.509 URL) Header Parameter. */
  x5u?: string;

  /** "jku" (JWK Set URL) Header Parameter. */
  jku?: string;

  /** "jwk" (JSON Web Key) Header Parameter. */
  jwk?: Pick<JWK, 'kty' | 'crv' | 'x' | 'y' | 'e' | 'n'>;

  /** "typ" (Type) Header Parameter. */
  typ?: string;

  /** "cty" (Content Type) Header Parameter. */
  cty?: string;
}

/** Recognized JWS Header Parameters, any other Header Members may also be present. */
export interface JWSHeaderParameters extends JoseHeaderParameters {
  /** JWS "alg" (Algorithm) Header Parameter. */
  alg?: string;

  /**
   * This JWS Extension Header Parameter modifies the JWS Payload representation and the JWS Signing
   * Input computation as per {@link https://www.rfc-editor.org/rfc/rfc7797 RFC7797}.
   */
  b64?: boolean;

  /** JWS "crit" (Critical) Header Parameter. */
  crit?: string[];

  /** Any other JWS Header member. */
  [propName: string]: unknown;
}

/** Recognized Compact JWS Header Parameters, any other Header Members may also be present. */
export interface CompactJWSHeaderParameters extends JWSHeaderParameters {
  alg: string;
}

/** Recognized JWE Header Parameters, any other Header members may also be present. */
export interface JWEHeaderParameters extends JoseHeaderParameters {
  /** JWE "alg" (Algorithm) Header Parameter. */
  alg?: 'RSA-OAEP-256' | 'RSA-OAEP';

  /** JWE "enc" (Encryption Algorithm) Header Parameter. */
  enc?: 'A256CBC-HS512' | 'A128CBC-HS256';

  /** Any other JWE Header member. */
  [propName: string]: unknown;
}

/** Recognized JWT Claims Set members, any other members may also be present. */
export interface JWTPayload {
  /**
   * JWT Issuer
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc7519#section-4.1.1 RFC7519#section-4.1.1}
   */
  iss?: string;

  /**
   * JWT Subject
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc7519#section-4.1.2 RFC7519#section-4.1.2}
   */
  sub?: string;

  /**
   * JWT Audience
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc7519#section-4.1.3 RFC7519#section-4.1.3}
   */
  aud?: string | string[];

  /**
   * JWT ID
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc7519#section-4.1.7 RFC7519#section-4.1.7}
   */
  jti?: string;

  /**
   * JWT Not Before
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc7519#section-4.1.5 RFC7519#section-4.1.5}
   */
  nbf?: number;

  /**
   * JWT Expiration Time
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc7519#section-4.1.4 RFC7519#section-4.1.4}
   */
  exp?: number;

  /**
   * JWT Issued At
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc7519#section-4.1.6 RFC7519#section-4.1.6}
   */
  iat?: number;

  /** Any other JWT Claim Set member. */
  [propName: string]: unknown;
}

/** JWT Claims Set verification options. */
export interface JWTClaimVerificationOptions {
  /** Expected JWT "aud" (Audience) Claim value(s). */
  audience?: string | string[];

  /**
   * Expected clock tolerance
   *
   * - In seconds when number (e.g. 5)
   * - Parsed as seconds when a string (e.g. "5 seconds", "10 minutes", "2 hours").
   */
  clockTolerance?: string | number;

  /** Expected JWT "iss" (Issuer) Claim value(s). */
  issuer?: string | string[];

  /**
   * Maximum time elapsed (in seconds) from the JWT "iat" (Issued At) Claim value.
   *
   * - In seconds when number (e.g. 5)
   * - Parsed as seconds when a string (e.g. "5 seconds", "10 minutes", "2 hours").
   */
  maxTokenAge?: string | number;

  /** Expected JWT "sub" (Subject) Claim value. */
  subject?: string;

  /** Expected JWT "typ" (Type) Header Parameter value. */
  typ?: string;

  /** Date to use when comparing NumericDate claims, defaults to `new Date()`. */
  currentDate?: Date;

  /**
   * Array of required Claim Names that must be present in the JWT Claims Set. Default is that: if
   * the {@link JWTClaimVerificationOptions.issuer issuer option} is set, then "iss" must be present;
   * if the {@link JWTClaimVerificationOptions.audience audience option} is set, then "aud" must be
   * present; if the {@link JWTClaimVerificationOptions.subject subject option} is set, then "sub"
   * must be present; if the {@link JWTClaimVerificationOptions.maxTokenAge maxTokenAge option} is
   * set, then "iat" must be present.
   */
  requiredClaims?: string[];
}

export interface JWK {
  /** JWK "alg" (Algorithm) Parameter. */
  'alg'?: string;
  'crv'?: string;
  'd'?: string;
  'dp'?: string;
  'dq'?: string;
  'e'?: string;
  /** JWK "ext" (Extractable) Parameter. */
  'ext'?: boolean;
  'k'?: string;
  /** JWK "key_ops" (Key Operations) Parameter. */
  'key_ops'?: string[];
  /** JWK "kid" (Key ID) Parameter. */
  'kid'?: string;
  /** JWK "kty" (Key Type) Parameter.
   * This attribute is required to discriminate the
   * type of EC/RSA algorithm */
  'kty': string;
  'n'?: string;
  'oth'?: Array<{
    d?: string;
    r?: string;
    t?: string;
  }>;
  'p'?: string;
  'q'?: string;
  'qi'?: string;
  /** JWK "use" (Public Key Use) Parameter. */
  'use'?: string;
  'x'?: string;
  'y'?: string;
  /** JWK "x5c" (X.509 Certificate Chain) Parameter. */
  'x5c'?: string[];
  /** JWK "x5t" (X.509 Certificate SHA-1 Thumbprint) Parameter. */
  'x5t'?: string;
  /** "x5t#S256" (X.509 Certificate SHA-256 Thumbprint) Parameter. */
  'x5t#S256'?: string;
  /** JWK "x5u" (X.509 URL) Parameter. */
  'x5u'?: string;

  [propName: string]: unknown;
}

export interface GenericMetadata {
  /** JWK "alg" (Algorithm) Parameter. */
  jwks: {
    keys: JWK[];
  };
}
