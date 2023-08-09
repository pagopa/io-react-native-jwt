# Interface: CompactJWSHeaderParameters

[types](../modules/types.md).CompactJWSHeaderParameters

Recognized Compact JWS Header Parameters, any other Header Members may also be present.

## Hierarchy

- [`JWSHeaderParameters`](types.JWSHeaderParameters.md)

  ↳ **`CompactJWSHeaderParameters`**

## Table of contents

### Properties

- [alg](types.CompactJWSHeaderParameters.md#alg)
- [b64](types.CompactJWSHeaderParameters.md#b64)
- [crit](types.CompactJWSHeaderParameters.md#crit)
- [cty](types.CompactJWSHeaderParameters.md#cty)
- [jku](types.CompactJWSHeaderParameters.md#jku)
- [jwk](types.CompactJWSHeaderParameters.md#jwk)
- [kid](types.CompactJWSHeaderParameters.md#kid)
- [typ](types.CompactJWSHeaderParameters.md#typ)
- [x5c](types.CompactJWSHeaderParameters.md#x5c)
- [x5t](types.CompactJWSHeaderParameters.md#x5t)
- [x5u](types.CompactJWSHeaderParameters.md#x5u)

## Properties

### alg

• **alg**: `string`

JWS "alg" (Algorithm) Header Parameter.

#### Overrides

[JWSHeaderParameters](types.JWSHeaderParameters.md).[alg](types.JWSHeaderParameters.md#alg)

___

### b64

• `Optional` **b64**: `boolean`

This JWS Extension Header Parameter modifies the JWS Payload representation and the JWS Signing
Input computation as per [RFC7797](https://www.rfc-editor.org/rfc/rfc7797).

#### Inherited from

[JWSHeaderParameters](types.JWSHeaderParameters.md).[b64](types.JWSHeaderParameters.md#b64)

___

### crit

• `Optional` **crit**: `string`[]

JWS "crit" (Critical) Header Parameter.

#### Inherited from

[JWSHeaderParameters](types.JWSHeaderParameters.md).[crit](types.JWSHeaderParameters.md#crit)

___

### cty

• `Optional` **cty**: `string`

"cty" (Content Type) Header Parameter.

#### Inherited from

[JWSHeaderParameters](types.JWSHeaderParameters.md).[cty](types.JWSHeaderParameters.md#cty)

___

### jku

• `Optional` **jku**: `string`

"jku" (JWK Set URL) Header Parameter.

#### Inherited from

[JWSHeaderParameters](types.JWSHeaderParameters.md).[jku](types.JWSHeaderParameters.md#jku)

___

### jwk

• `Optional` **jwk**: [`Pick`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys )<{ `kty`: `string` ; `alg?`: `string` ; `crv?`: `string` ; `d?`: `string` ; `dp?`: `string` ; `dq?`: `string` ; `e?`: `string` ; `ext?`: `boolean` ; `k?`: `string` ; `key_ops?`: `string`[] ; `kid?`: `string` ; `n?`: `string` ; `oth?`: { d?: string \| undefined; r?: string \| undefined; t?: string \| undefined; }[] ; `p?`: `string` ; `q?`: `string` ; `qi?`: `string` ; `use?`: `string` ; `x?`: `string` ; `x5c?`: `string`[] ; `x5t?`: `string` ; `x5t#S256?`: `string` ; `x5u?`: `string` ; `y?`: `string`  }, ``"crv"`` \| ``"e"`` \| ``"kty"`` \| ``"n"`` \| ``"x"`` \| ``"y"``\>

"jwk" (JSON Web Key) Header Parameter.

#### Inherited from

[JWSHeaderParameters](types.JWSHeaderParameters.md).[jwk](types.JWSHeaderParameters.md#jwk)

___

### kid

• `Optional` **kid**: `string`

"kid" (Key ID) Header Parameter.

#### Inherited from

[JWSHeaderParameters](types.JWSHeaderParameters.md).[kid](types.JWSHeaderParameters.md#kid)

___

### typ

• `Optional` **typ**: `string`

"typ" (Type) Header Parameter.

#### Inherited from

[JWSHeaderParameters](types.JWSHeaderParameters.md).[typ](types.JWSHeaderParameters.md#typ)

___

### x5c

• `Optional` **x5c**: `string`[]

"x5c" (X.509 Certificate Chain) Header Parameter.

#### Inherited from

[JWSHeaderParameters](types.JWSHeaderParameters.md).[x5c](types.JWSHeaderParameters.md#x5c)

___

### x5t

• `Optional` **x5t**: `string`

"x5t" (X.509 Certificate SHA-1 Thumbprint) Header Parameter.

#### Inherited from

[JWSHeaderParameters](types.JWSHeaderParameters.md).[x5t](types.JWSHeaderParameters.md#x5t)

___

### x5u

• `Optional` **x5u**: `string`

"x5u" (X.509 URL) Header Parameter.

#### Inherited from

[JWSHeaderParameters](types.JWSHeaderParameters.md).[x5u](types.JWSHeaderParameters.md#x5u)
