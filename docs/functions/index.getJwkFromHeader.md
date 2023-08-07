# Function: getJwkFromHeader

[index](../modules/index.md).getJwkFromHeader

▸ **getJwkFromHeader**(`header`, `jwks`): `Object`

Given the header of a JWT return the corresponding key from a JWKS.

It uses the "alg" (JWS Algorithm) Header Parameter to determine the right JWK "kty" (Key Type),
then proceeds to match the JWK "kid" (Key ID) with one found in the JWS Header Parameters (if
there is one).
Only a single public key must match the selection process.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | [`JWSHeaderParameters`](../interfaces/types.JWSHeaderParameters.md) | JWT header |
| `jwks` | { `kty`: `string` ; `alg?`: `string` ; `crv?`: `string` ; `d?`: `string` ; `dp?`: `string` ; `dq?`: `string` ; `e?`: `string` ; `ext?`: `boolean` ; `k?`: `string` ; `key_ops?`: `string`[] ; `kid?`: `string` ; `n?`: `string` ; `oth?`: { d?: string \| undefined; r?: string \| undefined; t?: string \| undefined; }[] ; `p?`: `string` ; `q?`: `string` ; `qi?`: `string` ; `use?`: `string` ; `x?`: `string` ; `x5c?`: `string`[] ; `x5t?`: `string` ; `x5t#S256?`: `string` ; `x5u?`: `string` ; `y?`: `string`  }[] | Json Web Key Set (JWKS) |

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `kty` | `string` | JWK "kty" (Key Type) Parameter. This attribute is required to discriminate the type of EC/RSA algorithm |
| `alg?` | `string` | - |
| `crv?` | `string` | - |
| `d?` | `string` | - |
| `dp?` | `string` | - |
| `dq?` | `string` | - |
| `e?` | `string` | - |
| `ext?` | `boolean` | JWK "ext" (Extractable) Parameter. |
| `k?` | `string` | - |
| `key_ops?` | `string`[] | JWK "key_ops" (Key Operations) Parameter. |
| `kid?` | `string` | JWK "kid" (Key ID) Parameter. |
| `n?` | `string` | - |
| `oth?` | { d?: string \| undefined; r?: string \| undefined; t?: string \| undefined; }[] | - |
| `p?` | `string` | - |
| `q?` | `string` | - |
| `qi?` | `string` | - |
| `use?` | `string` | JWK "use" (Public Key Use) Parameter. |
| `x?` | `string` | - |
| `x5c?` | `string`[] | JWK "x5c" (X.509 Certificate Chain) Parameter. |
| `x5t?` | `string` | JWK "x5t" (X.509 Certificate SHA-1 Thumbprint) Parameter. |
| `x5t#S256?` | `string` | "x5t#S256" (X.509 Certificate SHA-256 Thumbprint) Parameter. |
| `x5u?` | `string` | JWK "x5u" (X.509 URL) Parameter. |
| `y?` | `string` | - |
