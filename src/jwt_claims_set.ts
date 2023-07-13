/*
 * This code comes from https://github.com/panva/jose
 */
import type {
  JWTPayload,
  JWTClaimVerificationOptions,
  JWSHeaderParameters,
} from './types';
import { JWTClaimValidationFailed, JWTExpired } from './utils/errors';

import secs from './utils/secs';

const epoch = (date: Date) => Math.floor(date.getTime() / 1000);

const normalizeTyp = (value: string) =>
  value.toLowerCase().replace(/^application\//, '');

const checkAudiencePresence = (audPayload: unknown, audOption: unknown[]) => {
  if (typeof audPayload === 'string') {
    return audOption.includes(audPayload);
  }

  if (Array.isArray(audPayload)) {
    /*
     * Each principal intended to process the JWT MUST
     * identify itself with a value in the audience claim
     */
    return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
  }

  return false;
};

export default (
  protectedHeader: JWSHeaderParameters,
  payload: JWTPayload,
  options: JWTClaimVerificationOptions = {}
) => {
  const { typ } = options;
  if (
    typ &&
    (typeof protectedHeader!.typ !== 'string' ||
      normalizeTyp(protectedHeader!.typ) !== normalizeTyp(typ))
  ) {
    throw new JWTClaimValidationFailed(
      'unexpected "typ" JWT header value',
      'typ',
      'check_failed'
    );
  }

  const {
    requiredClaims = [],
    issuer,
    subject,
    audience,
    maxTokenAge,
  } = options;

  if (maxTokenAge !== undefined) requiredClaims.push('iat');
  if (audience !== undefined) requiredClaims.push('aud');
  if (subject !== undefined) requiredClaims.push('sub');
  if (issuer !== undefined) requiredClaims.push('iss');

  for (const claim of new Set(requiredClaims.reverse())) {
    if (!(claim in payload)) {
      throw new JWTClaimValidationFailed(
        `missing required "${claim}" claim`,
        claim,
        'missing'
      );
    }
  }

  if (
    issuer &&
    !(<unknown[]>(Array.isArray(issuer) ? issuer : [issuer])).includes(
      payload.iss!
    )
  ) {
    throw new JWTClaimValidationFailed(
      'unexpected "iss" claim value',
      'iss',
      'check_failed'
    );
  }

  if (subject && payload.sub !== subject) {
    throw new JWTClaimValidationFailed(
      'unexpected "sub" claim value',
      'sub',
      'check_failed'
    );
  }

  if (
    audience &&
    !checkAudiencePresence(
      payload.aud,
      typeof audience === 'string' ? [audience] : audience
    )
  ) {
    throw new JWTClaimValidationFailed(
      'unexpected "aud" claim value',
      'aud',
      'check_failed'
    );
  }

  let tolerance: number;
  switch (typeof options.clockTolerance) {
    case 'string':
      tolerance = secs(options.clockTolerance);
      break;
    case 'number':
      tolerance = options.clockTolerance;
      break;
    case 'undefined':
      tolerance = 0;
      break;
    default:
      throw new TypeError('Invalid clockTolerance option type');
  }

  const { currentDate } = options;
  const now = epoch(currentDate || new Date());

  if (
    (payload.iat !== undefined || maxTokenAge) &&
    typeof payload.iat !== 'number'
  ) {
    throw new JWTClaimValidationFailed(
      '"iat" claim must be a number',
      'iat',
      'invalid'
    );
  }

  if (payload.nbf !== undefined) {
    if (typeof payload.nbf !== 'number') {
      throw new JWTClaimValidationFailed(
        '"nbf" claim must be a number',
        'nbf',
        'invalid'
      );
    }
    if (payload.nbf > now + tolerance) {
      throw new JWTClaimValidationFailed(
        '"nbf" claim timestamp check failed',
        'nbf',
        'check_failed'
      );
    }
  }

  if (payload.exp !== undefined) {
    if (typeof payload.exp !== 'number') {
      throw new JWTClaimValidationFailed(
        '"exp" claim must be a number',
        'exp',
        'invalid'
      );
    }
    if (payload.exp <= now - tolerance) {
      throw new JWTExpired(
        '"exp" claim timestamp check failed',
        'exp',
        'check_failed'
      );
    }
  }

  if (maxTokenAge) {
    const age = now - payload.iat!;
    const max =
      typeof maxTokenAge === 'number' ? maxTokenAge : secs(maxTokenAge);

    if (age - tolerance > max) {
      throw new JWTExpired(
        '"iat" claim timestamp check failed (too far in the past)',
        'iat',
        'check_failed'
      );
    }

    if (age < 0 - tolerance) {
      throw new JWTClaimValidationFailed(
        '"iat" claim timestamp check failed (it should be in the past)',
        'iat',
        'check_failed'
      );
    }
  }

  return <JWTPayload>payload;
};
