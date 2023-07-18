# Class: ProduceJWT

[produce](../modules/produce.md).ProduceJWT

Generic class for JWT producing.

## Hierarchy

- **`ProduceJWT`**

  ↳ [`SignJWT`](sign.SignJWT.md)

  ↳ [`UnsecuredJWT`](index.UnsecuredJWT.md)

## Table of contents

### Constructors

- [constructor](produce.ProduceJWT.md#constructor)

### Methods

- [setAudience](produce.ProduceJWT.md#setaudience)
- [setExpirationTime](produce.ProduceJWT.md#setexpirationtime)
- [setIssuedAt](produce.ProduceJWT.md#setissuedat)
- [setIssuer](produce.ProduceJWT.md#setissuer)
- [setJti](produce.ProduceJWT.md#setjti)
- [setNotBefore](produce.ProduceJWT.md#setnotbefore)
- [setSubject](produce.ProduceJWT.md#setsubject)

## Constructors

### constructor

• **new ProduceJWT**(`payload`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [`JWTPayload`](../interfaces/types.JWTPayload.md) | The JWT Claims Set object. |

## Methods

### setAudience

▸ **setAudience**(`audience`): [`ProduceJWT`](produce.ProduceJWT.md)

Set "aud" (Audience) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `audience` | `string` \| `string`[] | "aud" (Audience) Claim value to set on the JWT Claims Set. |

#### Returns

[`ProduceJWT`](produce.ProduceJWT.md)

___

### setExpirationTime

▸ **setExpirationTime**(`input`): [`ProduceJWT`](produce.ProduceJWT.md)

Set "exp" (Expiration Time) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `number` | "exp" (Expiration Time) Claim value to set on the JWT Claims Set. When number is passed that is used as a value, when string is passed it is resolved to a time span and added to the current timestamp. |

#### Returns

[`ProduceJWT`](produce.ProduceJWT.md)

___

### setIssuedAt

▸ **setIssuedAt**(`input?`): [`ProduceJWT`](produce.ProduceJWT.md)

Set "iat" (Issued At) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input?` | `number` | "iat" (Issued At) Claim value to set on the JWT Claims Set. Default is current timestamp. |

#### Returns

[`ProduceJWT`](produce.ProduceJWT.md)

___

### setIssuer

▸ **setIssuer**(`issuer`): [`ProduceJWT`](produce.ProduceJWT.md)

Set "iss" (Issuer) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `issuer` | `string` | "Issuer" Claim value to set on the JWT Claims Set. |

#### Returns

[`ProduceJWT`](produce.ProduceJWT.md)

___

### setJti

▸ **setJti**(`jwtId`): [`ProduceJWT`](produce.ProduceJWT.md)

Set "jti" (JWT ID) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jwtId` | `string` | "jti" (JWT ID) Claim value to set on the JWT Claims Set. |

#### Returns

[`ProduceJWT`](produce.ProduceJWT.md)

___

### setNotBefore

▸ **setNotBefore**(`input`): [`ProduceJWT`](produce.ProduceJWT.md)

Set "nbf" (Not Before) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `number` | "nbf" (Not Before) Claim value to set on the JWT Claims Set. When number is passed that is used as a value, when string is passed it is resolved to a time span and added to the current timestamp. |

#### Returns

[`ProduceJWT`](produce.ProduceJWT.md)

___

### setSubject

▸ **setSubject**(`subject`): [`ProduceJWT`](produce.ProduceJWT.md)

Set "sub" (Subject) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subject` | `string` | "sub" (Subject) Claim value to set on the JWT Claims Set. |

#### Returns

[`ProduceJWT`](produce.ProduceJWT.md)
