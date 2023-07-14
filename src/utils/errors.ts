/**
 * A generic Error that all other JOSE specific Error subclasses extend.
 *
 * @example Checking thrown error is a JOSE one
 *
 * ```js
 * if (err instanceof errors.JOSEError) {
 *   // ...
 * }
 * ```
 */
export class JOSEError extends Error {
  /** A unique error code for the particular error subclass. */
  static get code(): string {
    return 'ERR_JOSE_GENERIC';
  }

  /** A unique error code for the particular error subclass. */
  code: string = 'ERR_JOSE_GENERIC';

  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
    // @ts-ignore
    Error.captureStackTrace?.(this, this.constructor);
  }
}
export class JWTClaimValidationFailed extends JOSEError {
  static get code(): 'ERR_JWT_CLAIM_VALIDATION_FAILED' {
    return 'ERR_JWT_CLAIM_VALIDATION_FAILED';
  }

  code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';

  /** The Claim for which the validation failed. */
  claim: string;

  /** Reason code for the validation failure. */
  reason: string;

  constructor(message: string, claim = 'unspecified', reason = 'unspecified') {
    super(message);
    this.claim = claim;
    this.reason = reason;
  }
}

/**
 * An error subclass thrown when a JWT is expired.
 *
 * @example Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWT_EXPIRED') {
 *   // ...
 * }
 * ```
 *
 * @example Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof errors.JWTExpired) {
 *   // ...
 * }
 * ```
 */
export class JWTExpired extends JOSEError implements JWTClaimValidationFailed {
  static get code(): 'ERR_JWT_EXPIRED' {
    return 'ERR_JWT_EXPIRED';
  }

  code = 'ERR_JWT_EXPIRED';

  /** The Claim for which the validation failed. */
  claim: string;

  /** Reason code for the validation failure. */
  reason: string;

  constructor(message: string, claim = 'unspecified', reason = 'unspecified') {
    super(message);
    this.claim = claim;
    this.reason = reason;
  }
}

/**
 * An error subclass thrown when a JOSE Algorithm is not allowed per developer preference.
 *
 * @example Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JOSE_ALG_NOT_ALLOWED') {
 *   // ...
 * }
 * ```
 *
 * @example Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof errors.JOSEAlgNotAllowed) {
 *   // ...
 * }
 * ```
 */
export class JOSEAlgNotAllowed extends JOSEError {
  static get code(): 'ERR_JOSE_ALG_NOT_ALLOWED' {
    return 'ERR_JOSE_ALG_NOT_ALLOWED';
  }

  code = 'ERR_JOSE_ALG_NOT_ALLOWED';
}

/**
 * An error subclass thrown when a particular feature or algorithm is not supported by this
 * implementation or JOSE in general.
 *
 * @example Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JOSE_NOT_SUPPORTED') {
 *   // ...
 * }
 * ```
 *
 * @example Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof errors.JOSENotSupported) {
 *   // ...
 * }
 * ```
 */
export class JOSENotSupported extends JOSEError {
  static get code(): 'ERR_JOSE_NOT_SUPPORTED' {
    return 'ERR_JOSE_NOT_SUPPORTED';
  }

  code = 'ERR_JOSE_NOT_SUPPORTED';
}

/**
 * An error subclass thrown when a JWT is invalid.
 *
 * @example Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWT_INVALID') {
 *   // ...
 * }
 * ```
 *
 * @example Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof errors.JWTInvalid) {
 *   // ...
 * }
 * ```
 */
export class JWTInvalid extends JOSEError {
  static get code(): 'ERR_JWT_INVALID' {
    return 'ERR_JWT_INVALID';
  }

  code = 'ERR_JWT_INVALID';
}

/**
 * An error subclass thrown when a JWT signature (JWS) is invalid.
 */
export class JWSInvalid extends JOSEError {
  static get code(): 'ERR_JWS_INVALID' {
    return 'ERR_JWS_INVALID';
  }

  code = 'ERR_JWS_INVALID';
}

/**
 * An error subclass thrown when JWS signature verification fails.
 *
 * @example Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
 *   // ...
 * }
 * ```
 *
 * @example Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof errors.JWSSignatureVerificationFailed) {
 *   // ...
 * }
 * ```
 */
export class JWSSignatureVerificationFailed extends JOSEError {
  static get code(): 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED' {
    return 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
  }

  code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';

  message = 'signature verification failed';
}
