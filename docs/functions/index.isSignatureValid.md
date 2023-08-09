# Function: isSignatureValid

[index](../modules/index.md).isSignatureValid

▸ **isSignatureValid**(`token`, `jwk`): [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`boolean`\>

Verifies the JWS signature

**`Example`**

Usage with a public JWK encoded RSA key

```js
const jwk = {
  crv: 'P-256',
  kty: 'EC',
  x: 'qrJrj3Af_B57sbOIRrcBM7br7wOc8ynj7lHFPTeffUk',
  y: '1H0cWDyGgvU8w-kPKU_xycOCUNT2o0bwslIQtnPU6iM',
}
const jwt =
  'eyJ0eXAiOiJlbnRpdHktc3RhdGVtZW50K2p3dCIsImtpZCI6IkVDIzEiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJodHRwczovL2lvLWQtd2FsbGV0LWl0LmF6dXJld2Vic2l0ZXMubmV0LyIsInN1YiI6Imh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvIiwibWV0YWRhdGEiOnsiZXVkaV93YWxsZXRfcHJvdmlkZXIiOnsiandrcyI6W3siY3J2IjoiUC0yNTYiLCJrdHkiOiJFQyIsIngiOiJxckpyajNBZl9CNTdzYk9JUnJjQk03YnI3d09jOHluajdsSEZQVGVmZlVrIiwieSI6IjFIMGNXRHlHZ3ZVOHcta1BLVV94eWNPQ1VOVDJvMGJ3c2xJUXRuUFU2aU0iLCJraWQiOiJFQyMxIn1dLCJ0b2tlbl9lbmRwb2ludCI6Imh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvdG9rZW4iLCJhc2NfdmFsdWVzX3N1cHBvcnRlZCI6WyJodHRwczovL2lvLWQtd2FsbGV0LWl0LmF6dXJld2Vic2l0ZXMubmV0L0xvQS9iYXNpYyIsImh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvTG9BL21lZGl1bSIsImh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvTG9BL2hpZ2h0Il0sImdyYW50X3R5cGVzX3N1cHBvcnRlZCI6WyJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1rZXktYXR0ZXN0YXRpb24iXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2RzX3N1cHBvcnRlZCI6WyJwcml2YXRlX2tleV9qd3QiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9zaWduaW5nX2FsZ192YWx1ZXNfc3VwcG9ydGVkIjpbIkVTMjU2IiwiRVMyNTZLIiwiRVMzODQiLCJFUzUxMiIsIlJTMjU2IiwiUlMzODQiLCJSUzUxMiIsIlBTMjU2IiwiUFMzODQiLCJQUzUxMiJdfSwiZmVkZXJhdGlvbl9lbnRpdHkiOnsib3JnYW5pemF0aW9uX25hbWUiOiJQYWdvUGEgUy5wLkEuIiwiaG9tZXBhZ2VfdXJpIjoiaHR0cHM6Ly9pby5pdGFsaWEuaXQvIiwicG9saWN5X3VyaSI6Imh0dHBzOi8vaW8uaXRhbGlhLml0L3ByaXZhY3ktcG9saWN5LyIsInRvc191cmkiOiJodHRwczovL2lvLml0YWxpYS5pdC9wcml2YWN5LXBvbGljeS8iLCJsb2dvX3VyaSI6Imh0dHBzOi8vaW8uaXRhbGlhLml0L2Fzc2V0cy9pbWcvaW8taXQtbG9nby13aGl0ZS5zdmcifX0sImlhdCI6MTY4OTIzNjYzNSwiZXhwIjoxNjg5MjQwMjM1fQ.6wA0M6rNYNSFN_EylzMA6ElAibW7FVSZyoLNEkHU5c_RKuiNenT08YIMvbysYautLZotUedEMP5xCyNpY34x6Q'

const isSignatureValid = await verify(jwt, jwk)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | - |
| `jwk` | `Object` | - |
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

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`boolean`\>
