# Class: JWTClaimValidationFailed

[utils/errors](../modules/utils_errors.md).JWTClaimValidationFailed

A generic Error that all other JOSE specific Error subclasses extend.

**`Example`**

Checking thrown error is a JOSE one

```js
if (err instanceof errors.JOSEError) {
  // ...
}
```

## Hierarchy

- [`JOSEError`](utils_errors.JOSEError.md)

  ↳ **`JWTClaimValidationFailed`**

## Implemented by

- [`JWTExpired`](utils_errors.JWTExpired.md)

## Table of contents

### Constructors

- [constructor](utils_errors.JWTClaimValidationFailed.md#constructor)

### Properties

- [claim](utils_errors.JWTClaimValidationFailed.md#claim)
- [code](utils_errors.JWTClaimValidationFailed.md#code)
- [reason](utils_errors.JWTClaimValidationFailed.md#reason)

### Accessors

- [code](utils_errors.JWTClaimValidationFailed.md#code-1)

## Constructors

### constructor

• **new JWTClaimValidationFailed**(`message`, `claim?`, `reason?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `string` | `undefined` |
| `claim` | `string` | `'unspecified'` |
| `reason` | `string` | `'unspecified'` |

#### Overrides

[JOSEError](utils_errors.JOSEError.md).[constructor](utils_errors.JOSEError.md#constructor)

## Properties

### claim

• **claim**: `string`

The Claim for which the validation failed.

___

### code

• **code**: `string` = `'ERR_JWT_CLAIM_VALIDATION_FAILED'`

A unique error code for the particular error subclass.

#### Overrides

[JOSEError](utils_errors.JOSEError.md).[code](utils_errors.JOSEError.md#code)

___

### reason

• **reason**: `string`

Reason code for the validation failure.

## Accessors

### code

• `Static` `get` **code**(): ``"ERR_JWT_CLAIM_VALIDATION_FAILED"``

A unique error code for the particular error subclass.

#### Returns

``"ERR_JWT_CLAIM_VALIDATION_FAILED"``

#### Overrides

JOSEError.code
