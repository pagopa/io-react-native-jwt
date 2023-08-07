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
| `key` | `Object` | Public Key or Secret to encrypt the JWE with. See |
| `key.kty` | `string` | JWK "kty" (Key Type) Parameter. This attribute is required to discriminate the type of EC/RSA algorithm |
| `key.alg?` | `string` | - |
| `key.crv?` | `string` | - |
| `key.d?` | `string` | - |
| `key.dp?` | `string` | - |
| `key.dq?` | `string` | - |
| `key.e?` | `string` | - |
| `key.ext?` | `boolean` | JWK "ext" (Extractable) Parameter. |
| `key.k?` | `string` | - |
| `key.key_ops?` | `string`[] | JWK "key_ops" (Key Operations) Parameter. |
| `key.kid?` | `string` | JWK "kid" (Key ID) Parameter. |
| `key.n?` | `string` | - |
| `key.oth?` | { d?: string \| undefined; r?: string \| undefined; t?: string \| undefined; }[] | - |
| `key.p?` | `string` | - |
| `key.q?` | `string` | - |
| `key.qi?` | `string` | - |
| `key.use?` | `string` | JWK "use" (Public Key Use) Parameter. |
| `key.x?` | `string` | - |
| `key.x5c?` | `string`[] | JWK "x5c" (X.509 Certificate Chain) Parameter. |
| `key.x5t?` | `string` | JWK "x5t" (X.509 Certificate SHA-1 Thumbprint) Parameter. |
| `key.x5t#S256?` | `string` | "x5t#S256" (X.509 Certificate SHA-256 Thumbprint) Parameter. |
| `key.x5u?` | `string` | JWK "x5u" (X.509 URL) Parameter. |
| `key.y?` | `string` | - |

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`string`\>
