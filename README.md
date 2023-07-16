# ⚡️ @pagopa/io-react-native-jwt

A fast implementation of `jwt` module.
Provides much greater performance for decoding, signing and verifying JWTs!

🚀 Use only native functions via the following libraries:
- 🤖 [nimbus-jose-jwt](https://github.com/felx/nimbus-jose-jwt/) on Android
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
const jwt = "eyJ0eXAiOiJlbnRpdHktc3.....";
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
const jwt = "eyJ0eXAiOiJlbnRpdHktc3.....";
const options = {
    typ: 'jwt',
    requiredClaims: ['iss', 'sub'],
}
const {protectedHeader, payload} = await verify(jwt, pubJwk, options);
console.log(protectedHeader, payload)
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
// Create unsecured jwt
let jwtToSign = new UnsecuredJWT({ metadata: 'demo' })
  .setAudience('demo')
  .setExpirationTime('1h')
  .setIssuedAt()
  .toSign();

// Create JWS
let signature = signWithMyCustomFunction(jwtToSign);

// Get payload from unsecured jwt
let jwtPayload = UnsecuredJWT.decodePayload(jwtToSign);

// Create signed JWT
let signedJwt = new SignJWT(jwtPayload)
  .setProtectedHeader({ alg: 'ES256' })
  .sign(signature);

```

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
