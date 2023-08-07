# Class: JWKNotFound

[utils/errors](../modules/utils_errors.md).JWKNotFound

An error subclass thrown when a JWK is not found.

## Hierarchy

- [`JOSEError`](utils_errors.JOSEError.md)

  ↳ **`JWKNotFound`**

## Table of contents

### Constructors

- [constructor](utils_errors.JWKNotFound.md#constructor)

### Properties

- [code](utils_errors.JWKNotFound.md#code)

### Accessors

- [code](utils_errors.JWKNotFound.md#code-1)

## Constructors

### constructor

• **new JWKNotFound**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

[JOSEError](utils_errors.JOSEError.md).[constructor](utils_errors.JOSEError.md#constructor)

## Properties

### code

• **code**: `string` = `'ERR_JWK_NOT_FOUND'`

A unique error code for the particular error subclass.

#### Overrides

[JOSEError](utils_errors.JOSEError.md).[code](utils_errors.JOSEError.md#code)

## Accessors

### code

• `Static` `get` **code**(): ``"ERR_JWK_NOT_FOUND"``

A unique error code for the particular error subclass.

#### Returns

``"ERR_JWK_NOT_FOUND"``

#### Overrides

JOSEError.code
