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
| `jwk` | [`JWK`](../interfaces/types.JWK.md) | JSON Web Key |

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`string`\>
