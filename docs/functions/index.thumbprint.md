# Function: thumbprint

[index](../modules/index.md).thumbprint

▸ **thumbprint**(`jwk`): [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`string`\>

Calculate JWK thumbprint

**`Example`**

Get JWK thumbprint

```js
const jwk: JWK = {
  crv: 'P-256',
  kty: 'EC',
  x: 'qrJrj3Af_B57sbOIRrcBM7br7wOc8ynj7lHFPTeffUk',
  y: '1H0cWDyGgvU8w-kPKU_xycOCUNT2o0bwslIQtnPU6iM',
};

const thumbprint = await thumbprint(jwk)

```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jwk` | `Object` | JSON Web Key |
| `jwk.kty` | `string` | JWK "kty" (Key Type) Parameter. This attribute is required to discriminate the type of EC/RSA algorithm |
| `jwk.alg?` | `string` | - |
| `jwk.crv?` | `string` | - |
| `jwk.d?` | `string` | - |
| `jwk.dp?` | `string` | - |
| `jwk.dq?` | `string` | - |
| `jwk.e?` | `string` | - |
| `jwk.ext?` | `boolean` | JWK "ext" (Extractable) Parameter. |
| `jwk.k?` | `string` | - |
| `jwk.key_ops?` | `string`[] | JWK "key_ops" (Key Operations) Parameter. |
| `jwk.kid?` | `string` | JWK "kid" (Key ID) Parameter. |
| `jwk.n?` | `string` | - |
| `jwk.oth?` | { d?: string \| undefined; r?: string \| undefined; t?: string \| undefined; }[] | - |
| `jwk.p?` | `string` | - |
| `jwk.q?` | `string` | - |
| `jwk.qi?` | `string` | - |
| `jwk.use?` | `string` | JWK "use" (Public Key Use) Parameter. |
| `jwk.x?` | `string` | - |
| `jwk.x5c?` | `string`[] | JWK "x5c" (X.509 Certificate Chain) Parameter. |
| `jwk.x5t?` | `string` | JWK "x5t" (X.509 Certificate SHA-1 Thumbprint) Parameter. |
| `jwk.x5t#S256?` | `string` | "x5t#S256" (X.509 Certificate SHA-256 Thumbprint) Parameter. |
| `jwk.x5u?` | `string` | JWK "x5u" (X.509 URL) Parameter. |
| `jwk.y?` | `string` | - |

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`string`\>
