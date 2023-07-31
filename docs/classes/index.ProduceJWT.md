# Class: ProduceJWT

[index](../modules/index.md).ProduceJWT

Generic class for JWT producing.

## Hierarchy

- **`ProduceJWT`**

  ↳ [`SignJWT`](index.SignJWT.md)

  ↳ [`UnsecuredJWT`](index.UnsecuredJWT.md)

## Table of contents

### Constructors

- [constructor](index.ProduceJWT.md#constructor)

### Methods

- [setAudience](index.ProduceJWT.md#setaudience)
- [setExpirationTime](index.ProduceJWT.md#setexpirationtime)
- [setIssuedAt](index.ProduceJWT.md#setissuedat)
- [setIssuer](index.ProduceJWT.md#setissuer)
- [setJti](index.ProduceJWT.md#setjti)
- [setNotBefore](index.ProduceJWT.md#setnotbefore)
- [setSubject](index.ProduceJWT.md#setsubject)

## Constructors

### constructor

• **new ProduceJWT**(`payload`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [`JWTPayload`](../interfaces/types.JWTPayload.md) | The JWT Claims Set object. |

## Methods

### setAudience

▸ **setAudience**(`audience`): [`ProduceJWT`](index.ProduceJWT.md)

Set "aud" (Audience) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `audience` | `string` \| `string`[] | "aud" (Audience) Claim value to set on the JWT Claims Set. |

#### Returns

[`ProduceJWT`](index.ProduceJWT.md)

___

### setExpirationTime

▸ **setExpirationTime**(`input`): [`ProduceJWT`](index.ProduceJWT.md)

Set "exp" (Expiration Time) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `number` | "exp" (Expiration Time) Claim value to set on the JWT Claims Set. When number is passed that is used as a value, when string is passed it is resolved to a time span and added to the current timestamp. |

#### Returns

[`ProduceJWT`](index.ProduceJWT.md)

___

### setIssuedAt

▸ **setIssuedAt**(`input?`): [`ProduceJWT`](index.ProduceJWT.md)

Set "iat" (Issued At) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input?` | `number` | "iat" (Issued At) Claim value to set on the JWT Claims Set. Default is current timestamp. |

#### Returns

[`ProduceJWT`](index.ProduceJWT.md)

___

### setIssuer

▸ **setIssuer**(`issuer`): [`ProduceJWT`](index.ProduceJWT.md)

Set "iss" (Issuer) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `issuer` | `string` | "Issuer" Claim value to set on the JWT Claims Set. |

#### Returns

[`ProduceJWT`](index.ProduceJWT.md)

___

### setJti

▸ **setJti**(`jwtId`): [`ProduceJWT`](index.ProduceJWT.md)

Set "jti" (JWT ID) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jwtId` | `string` | "jti" (JWT ID) Claim value to set on the JWT Claims Set. |

#### Returns

[`ProduceJWT`](index.ProduceJWT.md)

___

### setNotBefore

▸ **setNotBefore**(`input`): [`ProduceJWT`](index.ProduceJWT.md)

Set "nbf" (Not Before) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `number` | "nbf" (Not Before) Claim value to set on the JWT Claims Set. When number is passed that is used as a value, when string is passed it is resolved to a time span and added to the current timestamp. |

#### Returns

[`ProduceJWT`](index.ProduceJWT.md)

___

### setSubject

▸ **setSubject**(`subject`): [`ProduceJWT`](index.ProduceJWT.md)

Set "sub" (Subject) Claim.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subject` | `string` | "sub" (Subject) Claim value to set on the JWT Claims Set. |

#### Returns

[`ProduceJWT`](index.ProduceJWT.md)
