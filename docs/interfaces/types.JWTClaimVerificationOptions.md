# Interface: JWTClaimVerificationOptions

[types](../modules/types.md).JWTClaimVerificationOptions

JWT Claims Set verification options.

## Table of contents

### Properties

- [audience](types.JWTClaimVerificationOptions.md#audience)
- [clockTolerance](types.JWTClaimVerificationOptions.md#clocktolerance)
- [currentDate](types.JWTClaimVerificationOptions.md#currentdate)
- [issuer](types.JWTClaimVerificationOptions.md#issuer)
- [maxTokenAge](types.JWTClaimVerificationOptions.md#maxtokenage)
- [requiredClaims](types.JWTClaimVerificationOptions.md#requiredclaims)
- [subject](types.JWTClaimVerificationOptions.md#subject)
- [typ](types.JWTClaimVerificationOptions.md#typ)

## Properties

### audience

• `Optional` **audience**: `string` \| `string`[]

Expected JWT "aud" (Audience) Claim value(s).

___

### clockTolerance

• `Optional` **clockTolerance**: `string` \| `number`

Expected clock tolerance

- In seconds when number (e.g. 5)
- Parsed as seconds when a string (e.g. "5 seconds", "10 minutes", "2 hours").

___

### currentDate

• `Optional` **currentDate**: [`Date`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date )

Date to use when comparing NumericDate claims, defaults to `new Date()`.

___

### issuer

• `Optional` **issuer**: `string` \| `string`[]

Expected JWT "iss" (Issuer) Claim value(s).

___

### maxTokenAge

• `Optional` **maxTokenAge**: `string` \| `number`

Maximum time elapsed (in seconds) from the JWT "iat" (Issued At) Claim value.

- In seconds when number (e.g. 5)
- Parsed as seconds when a string (e.g. "5 seconds", "10 minutes", "2 hours").

___

### requiredClaims

• `Optional` **requiredClaims**: `string`[]

Array of required Claim Names that must be present in the JWT Claims Set. Default is that: if
the [issuer option](types.JWTClaimVerificationOptions.md#issuer) is set, then "iss" must be present;
if the [audience option](types.JWTClaimVerificationOptions.md#audience) is set, then "aud" must be
present; if the [subject option](types.JWTClaimVerificationOptions.md#subject) is set, then "sub"
must be present; if the [maxTokenAge option](types.JWTClaimVerificationOptions.md#maxtokenage) is
set, then "iat" must be present.

___

### subject

• `Optional` **subject**: `string`

Expected JWT "sub" (Subject) Claim value.

___

### typ

• `Optional` **typ**: `string`

Expected JWT "typ" (Type) Header Parameter value.
