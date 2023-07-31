# Class: SignJWT

[index](../modules/index.md).SignJWT

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

- [`ProduceJWT`](index.ProduceJWT.md)

  ↳ **`SignJWT`**

## Table of contents

### Constructors

- [constructor](index.SignJWT.md#constructor)

### Methods

- [appendSignature](index.SignJWT.md#appendsignature)
- [decode](index.SignJWT.md#decode)
- [decodeJwtWithoutSignature](index.SignJWT.md#decodejwtwithoutsignature)
- [setAudience](index.SignJWT.md#setaudience)
- [setExpirationTime](index.SignJWT.md#setexpirationtime)
- [setIssuedAt](index.SignJWT.md#setissuedat)
- [setIssuer](index.SignJWT.md#setissuer)
- [setJti](index.SignJWT.md#setjti)
- [setNotBefore](index.SignJWT.md#setnotbefore)
- [setProtectedHeader](index.SignJWT.md#setprotectedheader)
- [setSubject](index.SignJWT.md#setsubject)
- [toSign](index.SignJWT.md#tosign)

## Constructors

### constructor

• **new SignJWT**(`payload`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [`JWTPayload`](../interfaces/types.JWTPayload.md) | The JWT Claims Set object. |

#### Inherited from

[ProduceJWT](index.ProduceJWT.md).[constructor](index.ProduceJWT.md#constructor)

## Methods

### appendSignature

▸ `Static` **appendSignature**(`jwtWithoutSignature`, `signature`): [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`string`\>

Append signature to unsigned JWT.
For an ECDSA signature it is required that this is in ASN.1/DER encoded format.
The same format used by the TEE. Conversion to JWS is handled automatically.

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtWithoutSignature` | `string` |
| `signature` | `string` |

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

▸ **setAudience**(`audience`): [`SignJWT`](index.SignJWT.md)

Set "aud" (Audience) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `audience` | `string` \| `string`[] | "aud" (Audience) Claim value to set on the JWT Claims Set. |

#### Returns

[`SignJWT`](index.SignJWT.md)

#### Inherited from

[ProduceJWT](index.ProduceJWT.md).[setAudience](index.ProduceJWT.md#setaudience)

___

### setExpirationTime

▸ **setExpirationTime**(`input`): [`SignJWT`](index.SignJWT.md)

Set "exp" (Expiration Time) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `number` | "exp" (Expiration Time) Claim value to set on the JWT Claims Set. When number is passed that is used as a value, when string is passed it is resolved to a time span and added to the current timestamp. |

#### Returns

[`SignJWT`](index.SignJWT.md)

#### Inherited from

[ProduceJWT](index.ProduceJWT.md).[setExpirationTime](index.ProduceJWT.md#setexpirationtime)

___

### setIssuedAt

▸ **setIssuedAt**(`input?`): [`SignJWT`](index.SignJWT.md)

Set "iat" (Issued At) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input?` | `number` | "iat" (Issued At) Claim value to set on the JWT Claims Set. Default is current timestamp. |

#### Returns

[`SignJWT`](index.SignJWT.md)

#### Inherited from

[ProduceJWT](index.ProduceJWT.md).[setIssuedAt](index.ProduceJWT.md#setissuedat)

___

### setIssuer

▸ **setIssuer**(`issuer`): [`SignJWT`](index.SignJWT.md)

Set "iss" (Issuer) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `issuer` | `string` | "Issuer" Claim value to set on the JWT Claims Set. |

#### Returns

[`SignJWT`](index.SignJWT.md)

#### Inherited from

[ProduceJWT](index.ProduceJWT.md).[setIssuer](index.ProduceJWT.md#setissuer)

___

### setJti

▸ **setJti**(`jwtId`): [`SignJWT`](index.SignJWT.md)

Set "jti" (JWT ID) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jwtId` | `string` | "jti" (JWT ID) Claim value to set on the JWT Claims Set. |

#### Returns

[`SignJWT`](index.SignJWT.md)

#### Inherited from

[ProduceJWT](index.ProduceJWT.md).[setJti](index.ProduceJWT.md#setjti)

___

### setNotBefore

▸ **setNotBefore**(`input`): [`SignJWT`](index.SignJWT.md)

Set "nbf" (Not Before) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `number` | "nbf" (Not Before) Claim value to set on the JWT Claims Set. When number is passed that is used as a value, when string is passed it is resolved to a time span and added to the current timestamp. |

#### Returns

[`SignJWT`](index.SignJWT.md)

#### Inherited from

[ProduceJWT](index.ProduceJWT.md).[setNotBefore](index.ProduceJWT.md#setnotbefore)

___

### setProtectedHeader

▸ **setProtectedHeader**(`protectedHeader`): [`SignJWT`](index.SignJWT.md)

Sets the JWS Protected Header on the SignJWT object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `protectedHeader` | [`CompactJWSHeaderParameters`](../interfaces/types.CompactJWSHeaderParameters.md) | JWS Protected Header. Must contain an "alg" (JWS Algorithm) property. |

#### Returns

[`SignJWT`](index.SignJWT.md)

___

### setSubject

▸ **setSubject**(`subject`): [`SignJWT`](index.SignJWT.md)

Set "sub" (Subject) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subject` | `string` | "sub" (Subject) Claim value to set on the JWT Claims Set. |

#### Returns

[`SignJWT`](index.SignJWT.md)

#### Inherited from

[ProduceJWT](index.ProduceJWT.md).[setSubject](index.ProduceJWT.md#setsubject)

___

### toSign

▸ **toSign**(): `string`

Return a JWT without signature (`header.payload`) to sign.

#### Returns

`string`
