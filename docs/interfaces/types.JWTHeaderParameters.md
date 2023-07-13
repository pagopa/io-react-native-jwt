# Interface: JWTHeaderParameters

[types](../modules/types.md).JWTHeaderParameters

Recognized Signed JWT Header Parameters, any other Header Members may also be present.

## Hierarchy

- [`CompactJWSHeaderParameters`](types.CompactJWSHeaderParameters.md)

  ↳ **`JWTHeaderParameters`**

## Table of contents

### Properties

- [alg](types.JWTHeaderParameters.md#alg)
- [b64](types.JWTHeaderParameters.md#b64)
- [crit](types.JWTHeaderParameters.md#crit)
- [cty](types.JWTHeaderParameters.md#cty)
- [jku](types.JWTHeaderParameters.md#jku)
- [jwk](types.JWTHeaderParameters.md#jwk)
- [kid](types.JWTHeaderParameters.md#kid)
- [typ](types.JWTHeaderParameters.md#typ)
- [x5c](types.JWTHeaderParameters.md#x5c)
- [x5t](types.JWTHeaderParameters.md#x5t)
- [x5u](types.JWTHeaderParameters.md#x5u)

## Properties

### alg

• **alg**: `string`

JWS "alg" (Algorithm) Header Parameter.

#### Inherited from

[CompactJWSHeaderParameters](types.CompactJWSHeaderParameters.md).[alg](types.CompactJWSHeaderParameters.md#alg)

___

### b64

• `Optional` **b64**: ``true``

This JWS Extension Header Parameter modifies the JWS Payload representation and the JWS Signing
Input computation as per [RFC7797](https://www.rfc-editor.org/rfc/rfc7797).

#### Overrides

[CompactJWSHeaderParameters](types.CompactJWSHeaderParameters.md).[b64](types.CompactJWSHeaderParameters.md#b64)

___

### crit

• `Optional` **crit**: `string`[]

JWS "crit" (Critical) Header Parameter.

#### Inherited from

[CompactJWSHeaderParameters](types.CompactJWSHeaderParameters.md).[crit](types.CompactJWSHeaderParameters.md#crit)

___

### cty

• `Optional` **cty**: `string`

"cty" (Content Type) Header Parameter.

#### Inherited from

[CompactJWSHeaderParameters](types.CompactJWSHeaderParameters.md).[cty](types.CompactJWSHeaderParameters.md#cty)

___

### jku

• `Optional` **jku**: `string`

"jku" (JWK Set URL) Header Parameter.

#### Inherited from

[CompactJWSHeaderParameters](types.CompactJWSHeaderParameters.md).[jku](types.CompactJWSHeaderParameters.md#jku)

___

### jwk

• `Optional` **jwk**: [`Pick`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys )<[`JWK`](types.JWK.md), ``"crv"`` \| ``"e"`` \| ``"kty"`` \| ``"n"`` \| ``"x"`` \| ``"y"``\>

"jwk" (JSON Web Key) Header Parameter.

#### Inherited from

[CompactJWSHeaderParameters](types.CompactJWSHeaderParameters.md).[jwk](types.CompactJWSHeaderParameters.md#jwk)

___

### kid

• `Optional` **kid**: `string`

"kid" (Key ID) Header Parameter.

#### Inherited from

[CompactJWSHeaderParameters](types.CompactJWSHeaderParameters.md).[kid](types.CompactJWSHeaderParameters.md#kid)

___

### typ

• `Optional` **typ**: `string`

"typ" (Type) Header Parameter.

#### Inherited from

[CompactJWSHeaderParameters](types.CompactJWSHeaderParameters.md).[typ](types.CompactJWSHeaderParameters.md#typ)

___

### x5c

• `Optional` **x5c**: `string`[]

"x5c" (X.509 Certificate Chain) Header Parameter.

#### Inherited from

[CompactJWSHeaderParameters](types.CompactJWSHeaderParameters.md).[x5c](types.CompactJWSHeaderParameters.md#x5c)

___

### x5t

• `Optional` **x5t**: `string`

"x5t" (X.509 Certificate SHA-1 Thumbprint) Header Parameter.

#### Inherited from

[CompactJWSHeaderParameters](types.CompactJWSHeaderParameters.md).[x5t](types.CompactJWSHeaderParameters.md#x5t)

___

### x5u

• `Optional` **x5u**: `string`

"x5u" (X.509 URL) Header Parameter.

#### Inherited from

[CompactJWSHeaderParameters](types.CompactJWSHeaderParameters.md).[x5u](types.CompactJWSHeaderParameters.md#x5u)
