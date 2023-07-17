# Class: UnsecuredJWT

[index](../modules/index.md).UnsecuredJWT

The UnsecuredJWT class is a utility for dealing with `{ "alg": "none" }` Unsecured JWTs.

**`Example`**

Encoding

```js
const unsecuredJwt = new UnsecuredJWT({ 'urn:example:claim': true })
  .setIssuedAt()
  .setIssuer('urn:example:issuer')
  .setAudience('urn:example:audience')
  .setExpirationTime('2h')
  .encode()

console.log(unsecuredJwt)
```

**`Example`**

Decoding

```js
const payload = UnsecuredJWT.decode(jwt, {
  issuer: 'urn:example:issuer',
  audience: 'urn:example:audience',
})

console.log(payload)
```
 *

**`Example`**

JWT content ToSign

```js
const jwtToSign = new UnsecuredJWT({ 'urn:example:claim': true })
  .setIssuedAt()
  .setIssuer('urn:example:issuer')
  .setAudience('urn:example:audience')
  .setExpirationTime('2h')
  .toSign()

console.log(jwtToSign)
```

## Hierarchy

- [`ProduceJWT`](produce.ProduceJWT.md)

  ↳ **`UnsecuredJWT`**

## Table of contents

### Constructors

- [constructor](index.UnsecuredJWT.md#constructor)

### Methods

- [decode](index.UnsecuredJWT.md#decode)
- [decodePayload](index.UnsecuredJWT.md#decodepayload)
- [encode](index.UnsecuredJWT.md#encode)
- [setAudience](index.UnsecuredJWT.md#setaudience)
- [setExpirationTime](index.UnsecuredJWT.md#setexpirationtime)
- [setIssuedAt](index.UnsecuredJWT.md#setissuedat)
- [setIssuer](index.UnsecuredJWT.md#setissuer)
- [setJti](index.UnsecuredJWT.md#setjti)
- [setNotBefore](index.UnsecuredJWT.md#setnotbefore)
- [setSubject](index.UnsecuredJWT.md#setsubject)

## Constructors

### constructor

• **new UnsecuredJWT**(`payload`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [`JWTPayload`](../interfaces/types.JWTPayload.md) | The JWT Claims Set object. |

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[constructor](produce.ProduceJWT.md#constructor)

## Methods

### decode

▸ `Static` **decode**(`jwt`, `options?`): [`UnsecuredResult`](../interfaces/index.UnsecuredResult.md)

Decodes an unsecured JWT.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jwt` | `string` | Unsecured JWT to decode the payload of. |
| `options?` | [`JWTClaimVerificationOptions`](../interfaces/types.JWTClaimVerificationOptions.md) | JWT Claims Set validation options. |

#### Returns

[`UnsecuredResult`](../interfaces/index.UnsecuredResult.md)

___

### decodePayload

▸ `Static` **decodePayload**(`jwt`, `options?`): [`JWTPayload`](../interfaces/types.JWTPayload.md)

Decodes an unsecured JWT payload.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jwt` | `string` | Unsecured JWT payload to decode. |
| `options?` | [`JWTClaimVerificationOptions`](../interfaces/types.JWTClaimVerificationOptions.md) | JWT Claims Set validation options. |

#### Returns

[`JWTPayload`](../interfaces/types.JWTPayload.md)

___

### encode

▸ **encode**(): `string`

Encodes the Unsecured JWT.

#### Returns

`string`

___

### setAudience

▸ **setAudience**(`audience`): [`UnsecuredJWT`](index.UnsecuredJWT.md)

Set "aud" (Audience) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `audience` | `string` \| `string`[] | "aud" (Audience) Claim value to set on the JWT Claims Set. |

#### Returns

[`UnsecuredJWT`](index.UnsecuredJWT.md)

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[setAudience](produce.ProduceJWT.md#setaudience)

___

### setExpirationTime

▸ **setExpirationTime**(`input`): [`UnsecuredJWT`](index.UnsecuredJWT.md)

Set "exp" (Expiration Time) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `number` | "exp" (Expiration Time) Claim value to set on the JWT Claims Set. When number is passed that is used as a value, when string is passed it is resolved to a time span and added to the current timestamp. |

#### Returns

[`UnsecuredJWT`](index.UnsecuredJWT.md)

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[setExpirationTime](produce.ProduceJWT.md#setexpirationtime)

___

### setIssuedAt

▸ **setIssuedAt**(`input?`): [`UnsecuredJWT`](index.UnsecuredJWT.md)

Set "iat" (Issued At) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input?` | `number` | "iat" (Issued At) Claim value to set on the JWT Claims Set. Default is current timestamp. |

#### Returns

[`UnsecuredJWT`](index.UnsecuredJWT.md)

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[setIssuedAt](produce.ProduceJWT.md#setissuedat)

___

### setIssuer

▸ **setIssuer**(`issuer`): [`UnsecuredJWT`](index.UnsecuredJWT.md)

Set "iss" (Issuer) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `issuer` | `string` | "Issuer" Claim value to set on the JWT Claims Set. |

#### Returns

[`UnsecuredJWT`](index.UnsecuredJWT.md)

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[setIssuer](produce.ProduceJWT.md#setissuer)

___

### setJti

▸ **setJti**(`jwtId`): [`UnsecuredJWT`](index.UnsecuredJWT.md)

Set "jti" (JWT ID) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jwtId` | `string` | "jti" (JWT ID) Claim value to set on the JWT Claims Set. |

#### Returns

[`UnsecuredJWT`](index.UnsecuredJWT.md)

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[setJti](produce.ProduceJWT.md#setjti)

___

### setNotBefore

▸ **setNotBefore**(`input`): [`UnsecuredJWT`](index.UnsecuredJWT.md)

Set "nbf" (Not Before) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `number` | "nbf" (Not Before) Claim value to set on the JWT Claims Set. When number is passed that is used as a value, when string is passed it is resolved to a time span and added to the current timestamp. |

#### Returns

[`UnsecuredJWT`](index.UnsecuredJWT.md)

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[setNotBefore](produce.ProduceJWT.md#setnotbefore)

___

### setSubject

▸ **setSubject**(`subject`): [`UnsecuredJWT`](index.UnsecuredJWT.md)

Set "sub" (Subject) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subject` | `string` | "sub" (Subject) Claim value to set on the JWT Claims Set. |

#### Returns

[`UnsecuredJWT`](index.UnsecuredJWT.md)

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[setSubject](produce.ProduceJWT.md#setsubject)
