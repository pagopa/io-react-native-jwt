# Class: JOSEError

[utils/errors](../modules/utils_errors.md).JOSEError

A generic Error that all other JOSE specific Error subclasses extend.

**`Example`**

Checking thrown error is a JOSE one

```js
if (err instanceof errors.JOSEError) {
  // ...
}
```

## Hierarchy

- [`Error`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error )

  ↳ **`JOSEError`**

  ↳↳ [`JWTClaimValidationFailed`](utils_errors.JWTClaimValidationFailed.md)

  ↳↳ [`JWTExpired`](utils_errors.JWTExpired.md)

  ↳↳ [`JOSEAlgNotAllowed`](utils_errors.JOSEAlgNotAllowed.md)

  ↳↳ [`JOSENotSupported`](utils_errors.JOSENotSupported.md)

  ↳↳ [`JWTInvalid`](utils_errors.JWTInvalid.md)

  ↳↳ [`JWSInvalid`](utils_errors.JWSInvalid.md)

  ↳↳ [`JWSSignatureVerificationFailed`](utils_errors.JWSSignatureVerificationFailed.md)

  ↳↳ [`JWEInvalid`](utils_errors.JWEInvalid.md)

## Table of contents

### Constructors

- [constructor](utils_errors.JOSEError.md#constructor)

### Properties

- [code](utils_errors.JOSEError.md#code)

### Accessors

- [code](utils_errors.JOSEError.md#code-1)

## Constructors

### constructor

• **new JOSEError**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Overrides

Error.constructor

## Properties

### code

• **code**: `string` = `'ERR_JOSE_GENERIC'`

A unique error code for the particular error subclass.

## Accessors

### code

• `Static` `get` **code**(): `string`

A unique error code for the particular error subclass.

#### Returns

`string`
