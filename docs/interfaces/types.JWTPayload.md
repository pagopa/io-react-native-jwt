# Interface: JWTPayload

[types](../modules/types.md).JWTPayload

Recognized JWT Claims Set members, any other members may also be present.

## Indexable

▪ [propName: `string`]: `unknown`

## Table of contents

### Properties

- [aud](types.JWTPayload.md#aud)
- [exp](types.JWTPayload.md#exp)
- [iat](types.JWTPayload.md#iat)
- [iss](types.JWTPayload.md#iss)
- [jti](types.JWTPayload.md#jti)
- [nbf](types.JWTPayload.md#nbf)
- [sub](types.JWTPayload.md#sub)

## Properties

### aud

• `Optional` **aud**: `string` \| `string`[]

JWT Audience

**`See`**

[RFC7519#section-4.1.3](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.3)

___

### exp

• `Optional` **exp**: `number`

JWT Expiration Time

**`See`**

[RFC7519#section-4.1.4](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.4)

___

### iat

• `Optional` **iat**: `number`

JWT Issued At

**`See`**

[RFC7519#section-4.1.6](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.6)

___

### iss

• `Optional` **iss**: `string`

JWT Issuer

**`See`**

[RFC7519#section-4.1.1](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.1)

___

### jti

• `Optional` **jti**: `string`

JWT ID

**`See`**

[RFC7519#section-4.1.7](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.7)

___

### nbf

• `Optional` **nbf**: `number`

JWT Not Before

**`See`**

[RFC7519#section-4.1.5](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.5)

___

### sub

• `Optional` **sub**: `string`

JWT Subject

**`See`**

[RFC7519#section-4.1.2](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.2)
