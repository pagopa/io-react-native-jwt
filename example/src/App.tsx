import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
  Alert,
} from 'react-native';
import {
  decode,
  verify,
  isSignatureValid,
  SignJWT,
} from '@pagopa/io-react-native-jwt';
import type { JWK } from 'src/types';
import { generate, sign } from '@pagopa/io-react-native-crypto';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  const generateAndSign = async () => {
    const randomKeyTag = Math.random().toString(36).substr(2, 5);
    const pk = await generate(randomKeyTag);
    console.log(JSON.stringify(pk));

    // Create jwt
    let jwtToSign = new SignJWT({
      sub: 'demoApp',
      iss: 'PagoPa',
    })
      .setProtectedHeader({ alg: 'ES256', typ: 'JWT' })
      .toSign();

    // Sign with TEE
    const asn1Signature = await sign(jwtToSign, randomKeyTag);

    // Append signature to JWT
    let signedJwt = await SignJWT.appendAsn1Signature(jwtToSign, asn1Signature);
    console.log(JSON.stringify(signedJwt));

    verifyJwtSignature(signedJwt, pk);
  };

  const demoJwt =
    'eyJ0eXAiOiJlbnRpdHktc3RhdGVtZW50K2p3dCIsImtpZCI6IkVDIzEiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJodHRwczovL2lvLWQtd2FsbGV0LWl0LmF6dXJld2Vic2l0ZXMubmV0LyIsInN1YiI6Imh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvIiwibWV0YWRhdGEiOnsiZXVkaV93YWxsZXRfcHJvdmlkZXIiOnsiandrcyI6W3siY3J2IjoiUC0yNTYiLCJrdHkiOiJFQyIsIngiOiJxckpyajNBZl9CNTdzYk9JUnJjQk03YnI3d09jOHluajdsSEZQVGVmZlVrIiwieSI6IjFIMGNXRHlHZ3ZVOHcta1BLVV94eWNPQ1VOVDJvMGJ3c2xJUXRuUFU2aU0iLCJraWQiOiJFQyMxIn1dLCJ0b2tlbl9lbmRwb2ludCI6Imh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvdG9rZW4iLCJhc2NfdmFsdWVzX3N1cHBvcnRlZCI6WyJodHRwczovL2lvLWQtd2FsbGV0LWl0LmF6dXJld2Vic2l0ZXMubmV0L0xvQS9iYXNpYyIsImh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvTG9BL21lZGl1bSIsImh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvTG9BL2hpZ2h0Il0sImdyYW50X3R5cGVzX3N1cHBvcnRlZCI6WyJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1rZXktYXR0ZXN0YXRpb24iXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2RzX3N1cHBvcnRlZCI6WyJwcml2YXRlX2tleV9qd3QiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9zaWduaW5nX2FsZ192YWx1ZXNfc3VwcG9ydGVkIjpbIkVTMjU2IiwiRVMyNTZLIiwiRVMzODQiLCJFUzUxMiIsIlJTMjU2IiwiUlMzODQiLCJSUzUxMiIsIlBTMjU2IiwiUFMzODQiLCJQUzUxMiJdfSwiZmVkZXJhdGlvbl9lbnRpdHkiOnsib3JnYW5pemF0aW9uX25hbWUiOiJQYWdvUGEgUy5wLkEuIiwiaG9tZXBhZ2VfdXJpIjoiaHR0cHM6Ly9pby5pdGFsaWEuaXQvIiwicG9saWN5X3VyaSI6Imh0dHBzOi8vaW8uaXRhbGlhLml0L3ByaXZhY3ktcG9saWN5LyIsInRvc191cmkiOiJodHRwczovL2lvLml0YWxpYS5pdC9wcml2YWN5LXBvbGljeS8iLCJsb2dvX3VyaSI6Imh0dHBzOi8vaW8uaXRhbGlhLml0L2Fzc2V0cy9pbWcvaW8taXQtbG9nby13aGl0ZS5zdmcifX0sImlhdCI6MTY4OTIzNjYzNSwiZXhwIjoxNjg5MjQwMjM1fQ.6wA0M6rNYNSFN_EylzMA6ElAibW7FVSZyoLNEkHU5c_RKuiNenT08YIMvbysYautLZotUedEMP5xCyNpY34x6Q';

  const validJwk: JWK = {
    crv: 'P-256',
    kty: 'EC',
    x: 'qrJrj3Af_B57sbOIRrcBM7br7wOc8ynj7lHFPTeffUk',
    y: '1H0cWDyGgvU8w-kPKU_xycOCUNT2o0bwslIQtnPU6iM',
  };

  const invalidJwk: JWK = {
    crv: 'P-256',
    kty: 'EC',
    x: 'ndtDobIzSChVn2P7P7uXGm3cGdNlNDSapm4e0t_mDvg',
    y: '99_z6-vO97nwY-5mXL_d9qcryitmVRYezySt-0_LEqU',
  };

  const verifyJwtSignature = (jwt: string, publicKey: JWK) =>
    isSignatureValid(jwt, publicKey)
      .then((isValid) => {
        isValid
          ? setResult('✅ Signature is valid')
          : setResult('🛑 Invalid signature!');
      })
      .catch(showError);

  const verifyPayload = (jwt: string, publicKey: JWK) =>
    verify(jwt, publicKey, {
      currentDate: new Date('2023-07-13T10:30:00.000+02:00'),
      typ: 'entity-statement+jwt',
      requiredClaims: ['iss', 'sub', 'metadata'],
    })
      .then((decodedJwt) => setResult(JSON.stringify(decodedJwt)))
      .catch(showError);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="Decode JWT"
          onPress={() => {
            try {
              let decodedJwt = decode(demoJwt);
              return setResult(JSON.stringify(decodedJwt));
            } catch (e) {
              showError(e);
            }
          }}
        />
        <Button
          title="Verify JWT with valid JWK"
          onPress={() => verifyJwtSignature(demoJwt, validJwk)}
        />
        <Button
          title="Verify JWT with invalid JWK"
          onPress={() => verifyJwtSignature(demoJwt, invalidJwk)}
        />
        <Button
          title="Verify JWT payload"
          onPress={() => verifyPayload(demoJwt, validJwk)}
        />
        <Button
          title="Generate and sign JWT"
          onPress={() => generateAndSign().catch(showError)}
        />
      </View>
      <View>
        <Text style={styles.title}>{result}</Text>
      </View>
    </SafeAreaView>
  );
}

const showError = (e: any) => {
  Alert.alert('Error!', JSON.stringify(e), [{ text: 'OK' }]);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
