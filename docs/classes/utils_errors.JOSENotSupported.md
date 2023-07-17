# Class: JOSENotSupported

[utils/errors](../modules/utils_errors.md).JOSENotSupported

An error subclass thrown when a particular feature or algorithm is not supported by this
implementation or JOSE in general.

**`Example`**

Checking thrown error is this one using a stable error code

```js
if (err.code === 'ERR_JOSE_NOT_SUPPORTED') {
  // ...
}
```

**`Example`**

Checking thrown error is this one using `instanceof`

```js
if (err instanceof errors.JOSENotSupported) {
  // ...
}
```

## Hierarchy

- [`JOSEError`](utils_errors.JOSEError.md)

  ↳ **`JOSENotSupported`**

## Table of contents

### Constructors

- [constructor](utils_errors.JOSENotSupported.md#constructor)

### Properties

- [code](utils_errors.JOSENotSupported.md#code)

### Accessors

- [code](utils_errors.JOSENotSupported.md#code-1)

## Constructors

### constructor

• **new JOSENotSupported**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

[JOSEError](utils_errors.JOSEError.md).[constructor](utils_errors.JOSEError.md#constructor)

## Properties

### code

• **code**: `string` = `'ERR_JOSE_NOT_SUPPORTED'`

A unique error code for the particular error subclass.

#### Overrides

[JOSEError](utils_errors.JOSEError.md).[code](utils_errors.JOSEError.md#code)

## Accessors

### code

• `Static` `get` **code**(): ``"ERR_JOSE_NOT_SUPPORTED"``

A unique error code for the particular error subclass.

#### Returns

``"ERR_JOSE_NOT_SUPPORTED"``

#### Overrides

JOSEError.code
