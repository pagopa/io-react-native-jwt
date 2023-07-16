# Class: JWSSignatureVerificationFailed

[utils/errors](../modules/utils_errors.md).JWSSignatureVerificationFailed

An error subclass thrown when JWS signature verification fails.

**`Example`**

Checking thrown error is this one using a stable error code

```js
if (err.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
  // ...
}
```

**`Example`**

Checking thrown error is this one using `instanceof`

```js
if (err instanceof errors.JWSSignatureVerificationFailed) {
  // ...
}
```

## Hierarchy

- [`JOSEError`](utils_errors.JOSEError.md)

  ↳ **`JWSSignatureVerificationFailed`**

## Table of contents

### Constructors

- [constructor](utils_errors.JWSSignatureVerificationFailed.md#constructor)

### Properties

- [code](utils_errors.JWSSignatureVerificationFailed.md#code)
- [message](utils_errors.JWSSignatureVerificationFailed.md#message)

### Accessors

- [code](utils_errors.JWSSignatureVerificationFailed.md#code-1)

## Constructors

### constructor

• **new JWSSignatureVerificationFailed**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

[JOSEError](utils_errors.JOSEError.md).[constructor](utils_errors.JOSEError.md#constructor)

## Properties

### code

• **code**: `string` = `'ERR_JWS_SIGNATURE_VERIFICATION_FAILED'`

A unique error code for the particular error subclass.

#### Overrides

[JOSEError](utils_errors.JOSEError.md).[code](utils_errors.JOSEError.md#code)

___

### message

• **message**: `string` = `'signature verification failed'`

#### Overrides

JOSEError.message

## Accessors

### code

• `Static` `get` **code**(): ``"ERR_JWS_SIGNATURE_VERIFICATION_FAILED"``

A unique error code for the particular error subclass.

#### Returns

``"ERR_JWS_SIGNATURE_VERIFICATION_FAILED"``

#### Overrides

JOSEError.code
