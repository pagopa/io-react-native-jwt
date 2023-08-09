# Class: JWKSetInvalid

[utils/errors](../modules/utils_errors.md).JWKSetInvalid

An error subclass thrown when a JWKSet is invalid.

## Hierarchy

- [`JOSEError`](utils_errors.JOSEError.md)

  ↳ **`JWKSetInvalid`**

## Table of contents

### Constructors

- [constructor](utils_errors.JWKSetInvalid.md#constructor)

### Properties

- [code](utils_errors.JWKSetInvalid.md#code)

### Accessors

- [code](utils_errors.JWKSetInvalid.md#code-1)

## Constructors

### constructor

• **new JWKSetInvalid**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

[JOSEError](utils_errors.JOSEError.md).[constructor](utils_errors.JOSEError.md#constructor)

## Properties

### code

• **code**: `string` = `'ERR_JWKS_INVALID'`

A unique error code for the particular error subclass.

#### Overrides

[JOSEError](utils_errors.JOSEError.md).[code](utils_errors.JOSEError.md#code)

## Accessors

### code

• `Static` `get` **code**(): ``"ERR_JWKS_INVALID"``

A unique error code for the particular error subclass.

#### Returns

``"ERR_JWKS_INVALID"``

#### Overrides

JOSEError.code
