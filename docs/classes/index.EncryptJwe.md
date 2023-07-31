# Class: EncryptJwe

[index](../modules/index.md).EncryptJwe

The EncryptJwe class is used to build and encrypt Flattened JWE objects.

**`Example`**

Usage

```js
const jwe = await new EncryptJwe(
  new TextEncoder().encode('It’s a dangerous business, Frodo, going out your door.', { alg: 'RSA-OAEP-256', enc: 'A256GCM' }),
)
  .encrypt(publicKey)

console.log(jwe)
```

## Table of contents

### Constructors

- [constructor](index.EncryptJwe.md#constructor)

### Methods

- [encrypt](index.EncryptJwe.md#encrypt)

## Constructors

### constructor

• **new EncryptJwe**(`plaintext`, `header`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `plaintext` | [`String`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String ) | - |
| `header` | [`JWEHeaderParameters`](../interfaces/types.JWEHeaderParameters.md) & { `alg`: `string` ; `enc`: `string`  } | JWE header with alg and enc parameters. |

## Methods

### encrypt

▸ **encrypt**(`key`): [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`string`\>

Encrypts and resolves the value of the Flattened JWE object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | [`JWK`](../interfaces/types.JWK.md) | Public Key or Secret to encrypt the JWE with. See |

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`string`\>
