# Function: getRemoteJWKSet

[index](../modules/index.md).getRemoteJWKSet

▸ **getRemoteJWKSet**(`url`, `appFetch?`): [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<[`JWK`](../interfaces/types.JWK.md)[]\>

Returns a JSON Web Key Set (JWKS) downloaded from a remote endpoint,
that is, for example, an OAuth 2.0 or OIDC jwks_uri.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `url` | `string` | `undefined` | URL string to fetch the JSON Web Key Set from. |
| `appFetch` | (`input`: `RequestInfo`, `init?`: `RequestInit`) => [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`Response`\>(`input`: `RequestInfo`, `init?`: `RequestInit`) => [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`Response`\> | `fetch` | fetch function (optional) |

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<[`JWK`](../interfaces/types.JWK.md)[]\>
