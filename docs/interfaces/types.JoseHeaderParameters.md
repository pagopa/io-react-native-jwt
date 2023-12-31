# Interface: JoseHeaderParameters

[types](../modules/types.md).JoseHeaderParameters

## Hierarchy

- **`JoseHeaderParameters`**

  ↳ [`JWSHeaderParameters`](types.JWSHeaderParameters.md)

  ↳ [`JWEHeaderParameters`](types.JWEHeaderParameters.md)

## Table of contents

### Properties

- [cty](types.JoseHeaderParameters.md#cty)
- [jku](types.JoseHeaderParameters.md#jku)
- [jwk](types.JoseHeaderParameters.md#jwk)
- [kid](types.JoseHeaderParameters.md#kid)
- [typ](types.JoseHeaderParameters.md#typ)
- [x5c](types.JoseHeaderParameters.md#x5c)
- [x5t](types.JoseHeaderParameters.md#x5t)
- [x5u](types.JoseHeaderParameters.md#x5u)

## Properties

### cty

• `Optional` **cty**: `string`

"cty" (Content Type) Header Parameter.

___

### jku

• `Optional` **jku**: `string`

"jku" (JWK Set URL) Header Parameter.

___

### jwk

• `Optional` **jwk**: [`Pick`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys )<{ `kty`: `string` ; `alg?`: `string` ; `crv?`: `string` ; `d?`: `string` ; `dp?`: `string` ; `dq?`: `string` ; `e?`: `string` ; `ext?`: `boolean` ; `k?`: `string` ; `key_ops?`: `string`[] ; `kid?`: `string` ; `n?`: `string` ; `oth?`: { d?: string \| undefined; r?: string \| undefined; t?: string \| undefined; }[] ; `p?`: `string` ; `q?`: `string` ; `qi?`: `string` ; `use?`: `string` ; `x?`: `string` ; `x5c?`: `string`[] ; `x5t?`: `string` ; `x5t#S256?`: `string` ; `x5u?`: `string` ; `y?`: `string`  }, ``"crv"`` \| ``"e"`` \| ``"kty"`` \| ``"n"`` \| ``"x"`` \| ``"y"``\>

"jwk" (JSON Web Key) Header Parameter.

___

### kid

• `Optional` **kid**: `string`

"kid" (Key ID) Header Parameter.

___

### typ

• `Optional` **typ**: `string`

"typ" (Type) Header Parameter.

___

### x5c

• `Optional` **x5c**: `string`[]

"x5c" (X.509 Certificate Chain) Header Parameter.

___

### x5t

• `Optional` **x5t**: `string`

"x5t" (X.509 Certificate SHA-1 Thumbprint) Header Parameter.

___

### x5u

• `Optional` **x5u**: `string`

"x5u" (X.509 URL) Header Parameter.
