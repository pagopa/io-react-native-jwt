# ⚡️ @pagopa/io-react-native-jwt

React Native bridge to native JOSE functions. The package only exposes the native functions as they are: any JWT related logic (encoding, decoding, claims validation, signing) is up to the consumer.

🚀 Native functions are implemented via the following libraries:

- 🤖 [nimbus-jose-jwt](https://bitbucket.org/connect2id/nimbus-jose-jwt) on Android
- 📱 [JOSESwift](https://github.com/airsidemobile/JOSESwift/) on iOS

## Installation

```sh
npm install @pagopa/io-react-native-jwt
```

## API

| Function | Description |
| --- | --- |
| `verify(token: string, jwk: JWK): Promise<boolean>` | Verifies the signature of a compact JWS with an EC or RSA public key. |
| `unpackBerEncodedASN1(signature: string, coordinateOctetLength: number): Promise<string>` | Transcodes a base64 ASN.1/DER ECDSA signature into the base64 concatenated R + S format required by JWS ([RFC7515](https://datatracker.ietf.org/doc/html/rfc7515#appendix-A.3.1)). The coordinate length is 32 for P-256, 48 for P-384 and 66 for P-521. |
| `thumbprint(jwk: JWK): Promise<string>` | Computes the [RFC7638](https://datatracker.ietf.org/doc/html/rfc7638) thumbprint of an EC or RSA key. |
| `sha256(toHash: string): Promise<string>` | Computes the base64 SHA-256 hash of a UTF-8 string. |
| `enc(plaintext: string, header: JWEHeader, jwk: JWK): Promise<string>` | Encrypts the plaintext as a compact JWE with an EC or RSA public key. Supported `alg`: `RSA-OAEP-256`, `RSA-OAEP`, `ECDH-ES`; supported `enc`: `A256CBC-HS512`, `A128CBC-HS256`, `A256GCM`, `A128GCM`. |

Arguments and native results are validated at runtime with [Zod](https://zod.dev): invalid values reject the returned promise before reaching the native module. The `JWK` and `JWEHeader` schemas (and types) are exported as well.

## Usage

```ts
import {
  enc,
  sha256,
  thumbprint,
  unpackBerEncodedASN1,
  verify,
} from '@pagopa/io-react-native-jwt';

const jwk = {
  crv: 'P-256',
  kty: 'EC',
  x: 'qrJrj.....',
  y: '1H0cW.....',
};

const isValid = await verify(jwt, jwk);
const kid = await thumbprint(jwk);
const hash = await sha256('value');
const joseSignature = await unpackBerEncodedASN1(derSignature, 32);
const jwe = await enc('plaintext', { alg: 'ECDH-ES', enc: 'A256GCM' }, jwk);
```

## Example

You can use the [sample app](example) to test the native functions.

```sh
cd example

yarn install

# To use iOS
yarn ios

# To use Android
yarn android

```
