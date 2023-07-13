# Function: verify

[index](../modules/index.md).verify

▸ **verify**(`token`, `jwk`, `options?`): [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<[`JWTDecodeResult`](../interfaces/types.JWTDecodeResult.md)\>

Verifies the JWT format (to be a JWS Compact format), verifies the JWS signature, validates the
JWT Claims Set.

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

const { payload, protectedHeader } = await verify(jwt, jwk, {
  typ: 'entity-statement+jwt',
  requiredClaims: ['iss', 'sub', 'metadata'],
})

console.log(protectedHeader)
console.log(payload)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | - |
| `jwk` | [`JWK`](../interfaces/types.JWK.md) | - |
| `options` | [`JWTClaimVerificationOptions`](../interfaces/types.JWTClaimVerificationOptions.md) | JWT Decryption and JWT Claims Set validation options. |

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<[`JWTDecodeResult`](../interfaces/types.JWTDecodeResult.md)\>
