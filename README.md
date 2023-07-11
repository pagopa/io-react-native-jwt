# @pagopa/io-react-native-jwt

Native support for JWT

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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
