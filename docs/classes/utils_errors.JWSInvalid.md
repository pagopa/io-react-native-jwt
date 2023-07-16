# Class: JWSInvalid

[utils/errors](../modules/utils_errors.md).JWSInvalid

An error subclass thrown when a JWT signature (JWS) is invalid.

## Hierarchy

- [`JOSEError`](utils_errors.JOSEError.md)

  ↳ **`JWSInvalid`**

## Table of contents

### Constructors

- [constructor](utils_errors.JWSInvalid.md#constructor)

### Properties

- [code](utils_errors.JWSInvalid.md#code)

### Accessors

- [code](utils_errors.JWSInvalid.md#code-1)

## Constructors

### constructor

• **new JWSInvalid**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

[JOSEError](utils_errors.JOSEError.md).[constructor](utils_errors.JOSEError.md#constructor)

## Properties

### code

• **code**: `string` = `'ERR_JWS_INVALID'`

A unique error code for the particular error subclass.

#### Overrides

[JOSEError](utils_errors.JOSEError.md).[code](utils_errors.JOSEError.md#code)

## Accessors

### code

• `Static` `get` **code**(): ``"ERR_JWS_INVALID"``

A unique error code for the particular error subclass.

#### Returns

``"ERR_JWS_INVALID"``

#### Overrides

JOSEError.code
