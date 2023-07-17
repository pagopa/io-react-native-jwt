# Class: JOSEAlgNotAllowed

[utils/errors](../modules/utils_errors.md).JOSEAlgNotAllowed

An error subclass thrown when a JOSE Algorithm is not allowed per developer preference.

**`Example`**

Checking thrown error is this one using a stable error code

```js
if (err.code === 'ERR_JOSE_ALG_NOT_ALLOWED') {
  // ...
}
```

**`Example`**

Checking thrown error is this one using `instanceof`

```js
if (err instanceof errors.JOSEAlgNotAllowed) {
  // ...
}
```

## Hierarchy

- [`JOSEError`](utils_errors.JOSEError.md)

  ↳ **`JOSEAlgNotAllowed`**

## Table of contents

### Constructors

- [constructor](utils_errors.JOSEAlgNotAllowed.md#constructor)

### Properties

- [code](utils_errors.JOSEAlgNotAllowed.md#code)

### Accessors

- [code](utils_errors.JOSEAlgNotAllowed.md#code-1)

## Constructors

### constructor

• **new JOSEAlgNotAllowed**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

[JOSEError](utils_errors.JOSEError.md).[constructor](utils_errors.JOSEError.md#constructor)

## Properties

### code

• **code**: `string` = `'ERR_JOSE_ALG_NOT_ALLOWED'`

A unique error code for the particular error subclass.

#### Overrides

[JOSEError](utils_errors.JOSEError.md).[code](utils_errors.JOSEError.md#code)

## Accessors

### code

• `Static` `get` **code**(): ``"ERR_JOSE_ALG_NOT_ALLOWED"``

A unique error code for the particular error subclass.

#### Returns

``"ERR_JOSE_ALG_NOT_ALLOWED"``

#### Overrides

JOSEError.code
