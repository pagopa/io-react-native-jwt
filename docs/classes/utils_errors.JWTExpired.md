# Class: JWTExpired

[utils/errors](../modules/utils_errors.md).JWTExpired

An error subclass thrown when a JWT is expired.

**`Example`**

Checking thrown error is this one using a stable error code

```js
if (err.code === 'ERR_JWT_EXPIRED') {
  // ...
}
```

**`Example`**

Checking thrown error is this one using `instanceof`

```js
if (err instanceof errors.JWTExpired) {
  // ...
}
```

## Hierarchy

- [`JOSEError`](utils_errors.JOSEError.md)

  ↳ **`JWTExpired`**

## Implements

- [`JWTClaimValidationFailed`](utils_errors.JWTClaimValidationFailed.md)

## Table of contents

### Constructors

- [constructor](utils_errors.JWTExpired.md#constructor)

### Properties

- [claim](utils_errors.JWTExpired.md#claim)
- [code](utils_errors.JWTExpired.md#code)
- [reason](utils_errors.JWTExpired.md#reason)

### Accessors

- [code](utils_errors.JWTExpired.md#code-1)

## Constructors

### constructor

• **new JWTExpired**(`message`, `claim?`, `reason?`)

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

#### Implementation of

[JWTClaimValidationFailed](utils_errors.JWTClaimValidationFailed.md).[claim](utils_errors.JWTClaimValidationFailed.md#claim)

___

### code

• **code**: `string` = `'ERR_JWT_EXPIRED'`

A unique error code for the particular error subclass.

#### Implementation of

[JWTClaimValidationFailed](utils_errors.JWTClaimValidationFailed.md).[code](utils_errors.JWTClaimValidationFailed.md#code)

#### Overrides

[JOSEError](utils_errors.JOSEError.md).[code](utils_errors.JOSEError.md#code)

___

### reason

• **reason**: `string`

Reason code for the validation failure.

#### Implementation of

[JWTClaimValidationFailed](utils_errors.JWTClaimValidationFailed.md).[reason](utils_errors.JWTClaimValidationFailed.md#reason)

## Accessors

### code

• `Static` `get` **code**(): ``"ERR_JWT_EXPIRED"``

A unique error code for the particular error subclass.

#### Returns

``"ERR_JWT_EXPIRED"``

#### Overrides

JOSEError.code
