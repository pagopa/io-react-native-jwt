export interface JWTVerifyResult {
  /** JWT Claims Set. */
  payload: JWTPayload;

  /** JWS Protected Header. */
  protectedHeader: JWTHeaderParameters;
}

/**
 * JSON Web Key ({@link https://www.rfc-editor.org/rfc/rfc7517 JWK}). "RSA", "EC", "OKP", and "oct"
 * key types are supported.
 */
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
  /** JWK "kty" (Key Type) Parameter. */
  'kty'?: string;
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

/** Recognized Signed JWT Header Parameters, any other Header Members may also be present. */
export interface JWTHeaderParameters extends CompactJWSHeaderParameters {
  b64?: true;
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
