# ⚡️ @pagopa/io-react-native-jwt

A fast implementation of `jwt` module.
Provides much greater performance for decoding, signing and verifying JWTs!

🚀 Use only native functions via the following libraries:

- 🤖 [nimbus-jose-jwt](https://bitbucket.org/connect2id/nimbus-jose-jwt) on Android
- 📱 [JOSESwift](https://github.com/airsidemobile/JOSESwift/) on iOS

## Installation

```sh
npm install @pagopa/io-react-native-jwt
```

## Usage

For detailed documentation go [here](/docs/modules/index.md)

### Decode a JWT

```js
import { decode } from '@pagopa/io-react-native-jwt';

// ...
const jwt = 'eyJ0eXAiOiJlbnRpdHktc3.....';
const result = await decode(jwt);
console.log(result);
```

### Verify JWT

```js
import { verify } from '@pagopa/io-react-native-jwt';

// ...
const pubJwk = {
  crv: 'P-256',
  kty: 'EC',
  x: 'qrJrj.....',
  y: '1H0cW.....',
};
const jwt = 'eyJ0eXAiOiJlbnRpdHktc3.....';
const options = {
  typ: 'jwt',
  requiredClaims: ['iss', 'sub'],
};
const { protectedHeader, payload } = await verify(jwt, pubJwk, options);
console.log(protectedHeader, payload);
```

### Verify JWT with JWKS fetched from remote URL

```js
import { verify, getRemoteJWKSet } from '@pagopa/io-react-native-jwt';

// ...
const wellKnownUrl = 'https://example.com/.well-known/openid-federation';
const jwks = await getRemoteJWKSet(wellKnownUrl);

const jwt = 'eyJ0eXAiOiJlbnRpdHktc3.....';

const { protectedHeader, payload } = await verify(jwt, jwks);
console.log(protectedHeader, payload);
```

### Verify a JWT signature (JWS)

```js
import { isSignatureValid } from '@pagopa/io-react-native-jwt';

// ...
const pubJwk = {
    crv: 'P-256',
    kty: 'EC',
    x: 'qrJrj.....',
    y: '1H0cW.....',
  };
const jwt = "eyJ0eXAiOiJlbnRpdHktc3.....";

const isValid = await isSignatureValid(jwt, pubJwk);

if isValid {
    console.log("Signature of JWT is valid!");
} else {
    console.log("Signature of JWT is NOT valid!");
}
```

### Create and sign a JWT with a JWS

```js
// Public key of the signing key pair, and a function signing with the paired private key
const publicKey: JWK = userDefinedPublicKey();
const signFn = (value: string) => userDefinedSign(value);

// Create jwt
const jwt = new JWT(publicKey)
  .setPayload({ metadata: 'demo' })
  .setProtectedHeader({ typ: 'JWT' })
  .setAudience('demo')
  .setExpirationTime('1h')
  .setIssuedAt();

// get signed jwt
const signedJwt = await jwt.sign(signFn);
```

### JWK thumbprint

```js
import { thumbprint } from '@pagopa/io-react-native-jwt';

// ...
const pubJwk = {
  crv: 'P-256',
  kty: 'EC',
  x: 'qrJrj.....',
  y: '1H0cW.....',
};
const thumbprint = await thumbprint(pubJwk);
console.log(thumbprint);
```

##  Signature format

For an ECDSA signature it is required that this is in ASN.1/DER encoded format.
The same format supported by Secure Enclave (TEE).
Transcoding is done automatically via the following function:

```js
derToJose = async (
  asn1Signature: string,
  alg: string
): Promise<string>
```

Refs: [RFC7515](https://datatracker.ietf.org/doc/html/rfc7515#appendix-A.3.1)

## Example

You can use the [sample app](example) to test and understand how to use the library.

```sh
cd example

yarn install

# To use iOS
yarn ios

# To use Android
yarn android

```
