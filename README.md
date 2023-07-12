# ⚡️ @pagopa/io-react-native-jwt

A fast implementation of `jwt` module.
Provides much greater performance for decoding, signing and verifying JWTs!

🚀 Use only native functions via the following libraries:
- 🤖 [nimbus-jose-jwt
](https://connect2id.com/products/nimbus-jose-jwt) on Android
- 📱 [JOSESwift](https://github.com/airsidemobile/JOSESwift/) on iOS




## Installation

```sh
npm install @pagopa/io-react-native-jwt
```

## Usage

```js
import { decode } from '@pagopa/io-react-native-jwt';

// ...
const jwt = "eyJ0eXAiOiJlbnRpdHktc3......";
const result = await decode(jwt);
console.log(result);
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
