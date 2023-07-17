# Class: JWTInvalid

[utils/errors](../modules/utils_errors.md).JWTInvalid

An error subclass thrown when a JWT is invalid.

**`Example`**

Checking thrown error is this one using a stable error code

```js
if (err.code === 'ERR_JWT_INVALID') {
  // ...
}
```

**`Example`**

Checking thrown error is this one using `instanceof`

```js
if (err instanceof errors.JWTInvalid) {
  // ...
}
```

## Hierarchy

- [`JOSEError`](utils_errors.JOSEError.md)

  ↳ **`JWTInvalid`**

## Table of contents

### Constructors

- [constructor](utils_errors.JWTInvalid.md#constructor)

### Properties

- [code](utils_errors.JWTInvalid.md#code)

### Accessors

- [code](utils_errors.JWTInvalid.md#code-1)

## Constructors

### constructor

• **new JWTInvalid**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

[JOSEError](utils_errors.JOSEError.md).[constructor](utils_errors.JOSEError.md#constructor)

## Properties

### code

• **code**: `string` = `'ERR_JWT_INVALID'`

A unique error code for the particular error subclass.

#### Overrides

[JOSEError](utils_errors.JOSEError.md).[code](utils_errors.JOSEError.md#code)

## Accessors

### code

• `Static` `get` **code**(): ``"ERR_JWT_INVALID"``

A unique error code for the particular error subclass.

#### Returns

``"ERR_JWT_INVALID"``

#### Overrides

JOSEError.code
