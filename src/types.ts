import { z } from 'zod';
import type { SupportedAlgorithm } from './algorithms';

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
  alg?: SupportedAlgorithm;

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

/** JOSE Header for an unsecued JWT */
export interface JWTUnsecuredHeaderParameters extends JoseHeaderParameters {
  alg?: 'none';
}

/** Recognized JWE Header Parameters, any other Header members may also be present. */
export interface JWEHeaderParameters extends JoseHeaderParameters {
  /** JWE "alg" (Algorithm) Header Parameter. */
  alg?: 'RSA-OAEP-256' | 'RSA-OAEP' | 'ECDH-ES';

  /** JWE "enc" (Encryption Algorithm) Header Parameter. */
  enc?: 'A256CBC-HS512' | 'A128CBC-HS256' | 'A128CBC-HS256' | 'A256GCM';

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

export type JWK = z.infer<typeof JWK>;
export const JWK = z.object({
  'alg': z.string().optional(),
  'crv': z.string().optional(),
  'd': z.string().optional(),
  'dp': z.string().optional(),
  'dq': z.string().optional(),
  'e': z.string().optional(),
  /** JWK "ext" (Extractable) Parameter. */
  'ext': z.boolean().optional(),
  'k': z.string().optional(),
  /** JWK "key_ops" (Key Operations) Parameter. */
  'key_ops': z.array(z.string()).optional(),
  /** JWK "kid" (Key ID) Parameter. */
  'kid': z.string().optional(),
  /** JWK "kty" (Key Type) Parameter.
   * This attribute is required to discriminate the
   * type of EC/RSA algorithm */
  'kty': z.string(),
  'n': z.string().optional(),
  'oth': z
    .array(
      z.object({
        d: z.string().optional(),
        r: z.string().optional(),
        t: z.string().optional(),
      })
    )
    .optional(),
  'p': z.string().optional(),
  'q': z.string().optional(),
  'qi': z.string().optional(),
  /** JWK "use" (Public Key Use) Parameter. */
  'use': z.string().optional(),
  'x': z.string().optional(),
  'y': z.string().optional(),
  /** JWK "x5c" (X.509 Certificate Chain) Parameter. */
  'x5c': z.array(z.string()).optional(),
  /** JWK "x5t" (X.509 Certificate SHA-1 Thumbprint) Parameter. */
  'x5t': z.string().optional(),
  /** "x5t#S256" (X.509 Certificate SHA-256 Thumbprint) Parameter. */
  'x5t#S256': z.string().optional(),
  /** JWK "x5u" (X.509 URL) Parameter. */
  'x5u': z.string().optional(),
});

export type WithJWKS = z.infer<typeof WithJWKS>;
export const WithJWKS = z.object({
  jwks: z.object({
    keys: z.array(JWK),
  }),
});
