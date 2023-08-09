# Interface: JWEHeaderParameters

[types](../modules/types.md).JWEHeaderParameters

Recognized JWE Header Parameters, any other Header members may also be present.

## Hierarchy

- [`JoseHeaderParameters`](types.JoseHeaderParameters.md)

  ↳ **`JWEHeaderParameters`**

## Indexable

▪ [propName: `string`]: `unknown`

## Table of contents

### Properties

- [alg](types.JWEHeaderParameters.md#alg)
- [cty](types.JWEHeaderParameters.md#cty)
- [enc](types.JWEHeaderParameters.md#enc)
- [jku](types.JWEHeaderParameters.md#jku)
- [jwk](types.JWEHeaderParameters.md#jwk)
- [kid](types.JWEHeaderParameters.md#kid)
- [typ](types.JWEHeaderParameters.md#typ)
- [x5c](types.JWEHeaderParameters.md#x5c)
- [x5t](types.JWEHeaderParameters.md#x5t)
- [x5u](types.JWEHeaderParameters.md#x5u)

## Properties

### alg

• `Optional` **alg**: ``"RSA-OAEP-256"`` \| ``"RSA-OAEP"``

JWE "alg" (Algorithm) Header Parameter.

___

### cty

• `Optional` **cty**: `string`

"cty" (Content Type) Header Parameter.

#### Inherited from

[JoseHeaderParameters](types.JoseHeaderParameters.md).[cty](types.JoseHeaderParameters.md#cty)

___

### enc

• `Optional` **enc**: ``"A256CBC-HS512"`` \| ``"A128CBC-HS256"``

JWE "enc" (Encryption Algorithm) Header Parameter.

___

### jku

• `Optional` **jku**: `string`

"jku" (JWK Set URL) Header Parameter.

#### Inherited from

[JoseHeaderParameters](types.JoseHeaderParameters.md).[jku](types.JoseHeaderParameters.md#jku)

___

### jwk

• `Optional` **jwk**: [`Pick`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys )<{ `kty`: `string` ; `alg?`: `string` ; `crv?`: `string` ; `d?`: `string` ; `dp?`: `string` ; `dq?`: `string` ; `e?`: `string` ; `ext?`: `boolean` ; `k?`: `string` ; `key_ops?`: `string`[] ; `kid?`: `string` ; `n?`: `string` ; `oth?`: { d?: string \| undefined; r?: string \| undefined; t?: string \| undefined; }[] ; `p?`: `string` ; `q?`: `string` ; `qi?`: `string` ; `use?`: `string` ; `x?`: `string` ; `x5c?`: `string`[] ; `x5t?`: `string` ; `x5t#S256?`: `string` ; `x5u?`: `string` ; `y?`: `string`  }, ``"crv"`` \| ``"e"`` \| ``"kty"`` \| ``"n"`` \| ``"x"`` \| ``"y"``\>

"jwk" (JSON Web Key) Header Parameter.

#### Inherited from

[JoseHeaderParameters](types.JoseHeaderParameters.md).[jwk](types.JoseHeaderParameters.md#jwk)

___

### kid

• `Optional` **kid**: `string`

"kid" (Key ID) Header Parameter.

#### Inherited from

[JoseHeaderParameters](types.JoseHeaderParameters.md).[kid](types.JoseHeaderParameters.md#kid)

___

### typ

• `Optional` **typ**: `string`

"typ" (Type) Header Parameter.

#### Inherited from

[JoseHeaderParameters](types.JoseHeaderParameters.md).[typ](types.JoseHeaderParameters.md#typ)

___

### x5c

• `Optional` **x5c**: `string`[]

"x5c" (X.509 Certificate Chain) Header Parameter.

#### Inherited from

[JoseHeaderParameters](types.JoseHeaderParameters.md).[x5c](types.JoseHeaderParameters.md#x5c)

___

### x5t

• `Optional` **x5t**: `string`

"x5t" (X.509 Certificate SHA-1 Thumbprint) Header Parameter.

#### Inherited from

[JoseHeaderParameters](types.JoseHeaderParameters.md).[x5t](types.JoseHeaderParameters.md#x5t)

___

### x5u

• `Optional` **x5u**: `string`

"x5u" (X.509 URL) Header Parameter.

#### Inherited from

[JoseHeaderParameters](types.JoseHeaderParameters.md).[x5u](types.JoseHeaderParameters.md#x5u)
