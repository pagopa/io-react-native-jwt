# Interface: JWSHeaderParameters

[types](../modules/types.md).JWSHeaderParameters

Recognized JWS Header Parameters, any other Header Members may also be present.

## Hierarchy

- [`JoseHeaderParameters`](types.JoseHeaderParameters.md)

  ↳ **`JWSHeaderParameters`**

  ↳↳ [`CompactJWSHeaderParameters`](types.CompactJWSHeaderParameters.md)

## Indexable

▪ [propName: `string`]: `unknown`

## Table of contents

### Properties

- [alg](types.JWSHeaderParameters.md#alg)
- [b64](types.JWSHeaderParameters.md#b64)
- [crit](types.JWSHeaderParameters.md#crit)
- [cty](types.JWSHeaderParameters.md#cty)
- [jku](types.JWSHeaderParameters.md#jku)
- [jwk](types.JWSHeaderParameters.md#jwk)
- [kid](types.JWSHeaderParameters.md#kid)
- [typ](types.JWSHeaderParameters.md#typ)
- [x5c](types.JWSHeaderParameters.md#x5c)
- [x5t](types.JWSHeaderParameters.md#x5t)
- [x5u](types.JWSHeaderParameters.md#x5u)

## Properties

### alg

• `Optional` **alg**: `string`

JWS "alg" (Algorithm) Header Parameter.

___

### b64

• `Optional` **b64**: `boolean`

This JWS Extension Header Parameter modifies the JWS Payload representation and the JWS Signing
Input computation as per [RFC7797](https://www.rfc-editor.org/rfc/rfc7797).

___

### crit

• `Optional` **crit**: `string`[]

JWS "crit" (Critical) Header Parameter.

___

### cty

• `Optional` **cty**: `string`

"cty" (Content Type) Header Parameter.

#### Inherited from

[JoseHeaderParameters](types.JoseHeaderParameters.md).[cty](types.JoseHeaderParameters.md#cty)

___

### jku

• `Optional` **jku**: `string`

"jku" (JWK Set URL) Header Parameter.

#### Inherited from

[JoseHeaderParameters](types.JoseHeaderParameters.md).[jku](types.JoseHeaderParameters.md#jku)

___

### jwk

• `Optional` **jwk**: [`Pick`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys )<[`JWK`](types.JWK.md), ``"crv"`` \| ``"e"`` \| ``"kty"`` \| ``"n"`` \| ``"x"`` \| ``"y"``\>

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
