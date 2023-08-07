# Function: getJwkFromHeader

[index](../modules/index.md).getJwkFromHeader

▸ **getJwkFromHeader**(`header`, `jwks`): [`JWK`](../interfaces/types.JWK.md)

Given the header of a JWT return the corresponding key from a JWKS.

It uses the "alg" (JWS Algorithm) Header Parameter to determine the right JWK "kty" (Key Type),
then proceeds to match the JWK "kid" (Key ID) with one found in the JWS Header Parameters (if
there is one).

Only a single public key must match the selection process. As shown in the example below when
multiple keys get matched it is possible to opt-in to iterate over the matched keys and attempt
verification in an iterative manner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | [`JWSHeaderParameters`](../interfaces/types.JWSHeaderParameters.md) | JWT header |
| `jwks` | [`JWK`](../interfaces/types.JWK.md)[] | Json Web Key Set (JWKS) |

#### Returns

[`JWK`](../interfaces/types.JWK.md)
