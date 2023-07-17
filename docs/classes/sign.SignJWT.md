# Class: SignJWT

[sign](../modules/sign.md).SignJWT

The SignJWT class is used to build and sign Compact JWS formatted JSON Web Tokens.

**`Example`**

Usage with a given signature

```js
const alg = 'RS256'
const signature = 'Axy0....'

const jwt = new SignJWT({ 'urn:example:claim': true })
  .setProtectedHeader({ alg })
  .setIssuedAt()
  .setIssuer('urn:example:issuer')
  .setAudience('urn:example:audience')
  .setExpirationTime('2h')
  .sign(signature)

console.log(jwt)
```

## Hierarchy

- [`ProduceJWT`](produce.ProduceJWT.md)

  ↳ **`SignJWT`**

## Table of contents

### Constructors

- [constructor](sign.SignJWT.md#constructor)

### Methods

- [appendAsn1Signature](sign.SignJWT.md#appendasn1signature)
- [decode](sign.SignJWT.md#decode)
- [decodeJwtWithoutSignature](sign.SignJWT.md#decodejwtwithoutsignature)
- [setAudience](sign.SignJWT.md#setaudience)
- [setExpirationTime](sign.SignJWT.md#setexpirationtime)
- [setIssuedAt](sign.SignJWT.md#setissuedat)
- [setIssuer](sign.SignJWT.md#setissuer)
- [setJti](sign.SignJWT.md#setjti)
- [setNotBefore](sign.SignJWT.md#setnotbefore)
- [setProtectedHeader](sign.SignJWT.md#setprotectedheader)
- [setSubject](sign.SignJWT.md#setsubject)
- [toSign](sign.SignJWT.md#tosign)

## Constructors

### constructor

• **new SignJWT**(`payload`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [`JWTPayload`](../interfaces/types.JWTPayload.md) | The JWT Claims Set object. |

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[constructor](produce.ProduceJWT.md#constructor)

## Methods

### appendAsn1Signature

▸ `Static` **appendAsn1Signature**(`jwtWithoutSignature`, `asn1Signature`): [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`string`\>

Append JWS to unsigned JWT.

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtWithoutSignature` | `string` |
| `asn1Signature` | `string` |

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`string`\>

___

### decode

▸ `Static` **decode**(`jwt`): [`JWTDecodeResult`](../interfaces/types.JWTDecodeResult.md)

Decodes a JWT without signature

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwt` | `string` |

#### Returns

[`JWTDecodeResult`](../interfaces/types.JWTDecodeResult.md)

___

### decodeJwtWithoutSignature

▸ `Static` **decodeJwtWithoutSignature**(`jwtWithoutSignature`): `Object`

Decodes a JWT without signature

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jwtWithoutSignature` | `string` | JWT to sign that needs to be decoded. |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `header` | [`CompactJWSHeaderParameters`](../interfaces/types.CompactJWSHeaderParameters.md) |
| `payload` | [`JWTPayload`](../interfaces/types.JWTPayload.md) |

___

### setAudience

▸ **setAudience**(`audience`): [`SignJWT`](sign.SignJWT.md)

Set "aud" (Audience) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `audience` | `string` \| `string`[] | "aud" (Audience) Claim value to set on the JWT Claims Set. |

#### Returns

[`SignJWT`](sign.SignJWT.md)

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[setAudience](produce.ProduceJWT.md#setaudience)

___

### setExpirationTime

▸ **setExpirationTime**(`input`): [`SignJWT`](sign.SignJWT.md)

Set "exp" (Expiration Time) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `number` | "exp" (Expiration Time) Claim value to set on the JWT Claims Set. When number is passed that is used as a value, when string is passed it is resolved to a time span and added to the current timestamp. |

#### Returns

[`SignJWT`](sign.SignJWT.md)

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[setExpirationTime](produce.ProduceJWT.md#setexpirationtime)

___

### setIssuedAt

▸ **setIssuedAt**(`input?`): [`SignJWT`](sign.SignJWT.md)

Set "iat" (Issued At) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input?` | `number` | "iat" (Issued At) Claim value to set on the JWT Claims Set. Default is current timestamp. |

#### Returns

[`SignJWT`](sign.SignJWT.md)

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[setIssuedAt](produce.ProduceJWT.md#setissuedat)

___

### setIssuer

▸ **setIssuer**(`issuer`): [`SignJWT`](sign.SignJWT.md)

Set "iss" (Issuer) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `issuer` | `string` | "Issuer" Claim value to set on the JWT Claims Set. |

#### Returns

[`SignJWT`](sign.SignJWT.md)

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[setIssuer](produce.ProduceJWT.md#setissuer)

___

### setJti

▸ **setJti**(`jwtId`): [`SignJWT`](sign.SignJWT.md)

Set "jti" (JWT ID) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jwtId` | `string` | "jti" (JWT ID) Claim value to set on the JWT Claims Set. |

#### Returns

[`SignJWT`](sign.SignJWT.md)

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[setJti](produce.ProduceJWT.md#setjti)

___

### setNotBefore

▸ **setNotBefore**(`input`): [`SignJWT`](sign.SignJWT.md)

Set "nbf" (Not Before) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `number` | "nbf" (Not Before) Claim value to set on the JWT Claims Set. When number is passed that is used as a value, when string is passed it is resolved to a time span and added to the current timestamp. |

#### Returns

[`SignJWT`](sign.SignJWT.md)

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[setNotBefore](produce.ProduceJWT.md#setnotbefore)

___

### setProtectedHeader

▸ **setProtectedHeader**(`protectedHeader`): [`SignJWT`](sign.SignJWT.md)

Sets the JWS Protected Header on the SignJWT object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `protectedHeader` | [`CompactJWSHeaderParameters`](../interfaces/types.CompactJWSHeaderParameters.md) | JWS Protected Header. Must contain an "alg" (JWS Algorithm) property. |

#### Returns

[`SignJWT`](sign.SignJWT.md)

___

### setSubject

▸ **setSubject**(`subject`): [`SignJWT`](sign.SignJWT.md)

Set "sub" (Subject) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subject` | `string` | "sub" (Subject) Claim value to set on the JWT Claims Set. |

#### Returns

[`SignJWT`](sign.SignJWT.md)

#### Inherited from

[ProduceJWT](produce.ProduceJWT.md).[setSubject](produce.ProduceJWT.md#setsubject)

___

### toSign

▸ **toSign**(): `string`

Return a JWT without signature (`header.payload`) to sign.

#### Returns

`string`
