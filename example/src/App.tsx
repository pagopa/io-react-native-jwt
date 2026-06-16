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
  thumbprint,
  sha256ToBase64,
  EncryptJwe,
  getRemoteJWKSet,
} from '@pagopa/io-react-native-jwt';

import { generate, sign, getPublicKey } from '@pagopa/io-react-native-crypto';
import type { JWK } from '../../src/types';

// Factory to create context bound to a key
const createCryptoContext = (keyTag: string) => ({
  getPublicKey: () => getPublicKey(keyTag),
  getSignature: (value: string) => sign(value, keyTag),
});

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  const encJwk = {
    p: '-xeFWh5RKpL-glDQAjA9E5xykWajZv12vFsx60vxSjx9b1g8VQwM3xD4pvhUJ5a4JvbkBq_86P59x6Y1Nl7Hs-U3hZXgA9tkWY_DBrzyfiKgE2OQM0fK3Qmbj9QHESnhapMv_MLSxbX1Zmf5b8ubzSAI2V2MF9emGpdwnrEcDD0',
    kty: 'RSA',
    q: 'wk4pcSSF_W3ikjIC8ZwAN_iAoGISB3shsa5mHgIb5PARcC4SAZEpHtOZyfvrs7RJnCBgVFjPwlVw--b15MTu5ZaP6V8EQOon-9dPk90D6BAdHi0xfG0kBX5Ptmbl60BenveOxBq4NkqI1o97BU-PRiGs5Su_OC0wP1aMsc-x_GE',
    d: 'OT_TzvOUE9jRpzJbwCZEgt6FnC-JBU0m-rtGMwueVj7QcTH7OjavJseES97gI475FqingV2w18npdWDy2PhJWbo-4hCaw-fzqtdP0NK-_d6WYqZXMTHQo0UddG_qg2ZFcdlgluCoZPpdfNo4oyXH7T8HfBKUJkp5kkr6o84Kg4cH18q4o1YoW63SfQp50I3QrtONwzkwCMFQfzDt3A-CdFVpjISCRQJspjE780Nzp6XEV6OWzmBVrXVXLS_4LXF38kxDkN9z8DThsJxxgpjlHnBcwe2papsWx76ya6WoreNYfD50h4o5x5MJbfFmo6vxqgw1aEseHtFc6lAMQnA9gQ',
    e: 'AQAB',
    use: 'enc',
    kid: 'JW12l9ZAiNUkg9Op2TMAdIbHxxDQnXBq1FIpQqHccW4',
    qi: '58VCttcnaWPdqq514viq14XrJ9vSLCCmn0ace8pddB6D1ARBq21im75KH_jUmvDtcoojM_GVaTclMsBmSOrEEw2a2N-R9U-QAZ8UI-x9EDHPItUsOm_ejtOX1AcX-LVjGGqFMllJIYhZChzO6__od-WkXCyCC3oKkSBoWTRjCqU',
    dp: 'L4MO37OW5jh0YlJKWe-ozvouj6bdSpKxkgirlHuFR-fUUGpg2DL0iI0cj_OzcN5LMExNb5qDf88QG-Quc4BRx4-bBvMKNZChF3VlkPPV6tpAcgrH8XwnPdYgkoGraKsFFXaOgQSYf4Lj0aHhCC995r2mDwNti-Fpc-SuEckvpn0',
    alg: 'RSA-OAEP-256',
    dq: 'Dqk5JUldNtcgvmk5oaNkvNRqWC-uLpRS4YZIPEFqe2bF2hIP18BtOt86fmwcx811tGsY-aRN4NrzkH5H1YAqinZG25QIzSEd7Tm8zmphzhPRLqK4ViwiCKwUNa4j8RFFUndZdWCSv731_0KKRMdRBzipRA19-y4lstHEAfKq-mE',
    n: 'vpR83qn-xSu5asxFeKjl6rAMNNxze2R7Ut_oDTw2ERoAwRuIrrAceH_JU0bUiPD9Rwjo1000W7yN1T_w8N2cIh2uk3qll-CT9tUO1rifER7BsLbNHHpPDKYxuDZknLp7Ml-OMlb75i9WvHgRVqXVrIepfS-BM30u1eoxNygetWz_X-qkRv-5JXyGtL54Tc0x8oARsD-cMM6_rhgBJsx494cvwV5hw80j260WVtI8at727ZpXL1SpHVTI3R2m8g-xDkrRrlW8GbRbZ1WgJDVBJH5TAFGxEAd-Fva7ig2XC_zxrNpAupLDvwShIeIVpfmqkLsHlWGbIFU_v9bvgNmvHQ',
  };

  const ecEncJwk = {
    kty: 'EC',
    use: 'enc',
    crv: 'P-256',
    kid: 'ebedaab1-4df4-44a7-8588-7dcf07434a6d',
    x: 'IrxU7LHlxBligUjnQnra-Lfx2gKGGMDgZwQQE7RszPo',
    y: 'yRBrbX_0iMlsrDKEh5g8xfGgadBr0VnVQQWk4SGq71Y',
    alg: 'ECDH-ES',
  };

  const generateAndSign = async () => {
    loading();
    const randomKeyTag = Math.random().toString(36).substr(2, 5);
    const pk = await generate(randomKeyTag);
    console.log(pk);
    const crypto = createCryptoContext(randomKeyTag);

    // Create jwt
    const signedJwt = await new SignJWT(crypto)
      .setPayload({
        sub: 'demoApp',
        iss: 'PagoPa',
      })
      .setProtectedHeader({ typ: 'JWT' })
      .sign();

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

  const remoteMetadataJwt =
    'eyJ0eXAiOiJlbnRpdHktc3RhdGVtZW50K2p3dCIsImtpZCI6IkVDIzEiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJodHRwczovL2lvLWQtd2FsbGV0LWl0LmF6dXJld2Vic2l0ZXMubmV0LyIsInN1YiI6Imh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiYXV0aG9yaXR5X2hpbnRzIjoiaHR0cHM6Ly9kZW1vLmZlZGVyYXRpb24uZXVkaS53YWxsZXQuZGV2ZWxvcGVycy5pdGFsaWEuaXQvIiwiandrcyI6eyJrZXlzIjpbeyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6InFySnJqM0FmX0I1N3NiT0lScmNCTTdicjd3T2M4eW5qN2xIRlBUZWZmVWsiLCJ5IjoiMUgwY1dEeUdndlU4dy1rUEtVX3h5Y09DVU5UMm8wYndzbElRdG5QVTZpTSIsImtpZCI6IkVDIzEifV19LCJtZXRhZGF0YSI6eyJ3YWxsZXRfcHJvdmlkZXIiOnsiandrcyI6eyJrZXlzIjpbeyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6InFySnJqM0FmX0I1N3NiT0lScmNCTTdicjd3T2M4eW5qN2xIRlBUZWZmVWsiLCJ5IjoiMUgwY1dEeUdndlU4dy1rUEtVX3h5Y09DVU5UMm8wYndzbElRdG5QVTZpTSIsImtpZCI6IkVDIzEifV19LCJ0b2tlbl9lbmRwb2ludCI6Imh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvdG9rZW4iLCJhc2NfdmFsdWVzX3N1cHBvcnRlZCI6WyJodHRwczovL2lvLWQtd2FsbGV0LWl0LmF6dXJld2Vic2l0ZXMubmV0L0xvQS9iYXNpYyIsImh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvTG9BL21lZGl1bSIsImh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvTG9BL2hpZ2h0Il0sImdyYW50X3R5cGVzX3N1cHBvcnRlZCI6WyJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1rZXktYXR0ZXN0YXRpb24iXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2RzX3N1cHBvcnRlZCI6WyJwcml2YXRlX2tleV9qd3QiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9zaWduaW5nX2FsZ192YWx1ZXNfc3VwcG9ydGVkIjpbIkVTMjU2IiwiRVMyNTZLIiwiRVMzODQiLCJFUzUxMiIsIlJTMjU2IiwiUlMzODQiLCJSUzUxMiIsIlBTMjU2IiwiUFMzODQiLCJQUzUxMiJdfSwiZmVkZXJhdGlvbl9lbnRpdHkiOnsib3JnYW5pemF0aW9uX25hbWUiOiJQYWdvUGEgUy5wLkEuIiwiaG9tZXBhZ2VfdXJpIjoiaHR0cHM6Ly9pby5pdGFsaWEuaXQvIiwicG9saWN5X3VyaSI6Imh0dHBzOi8vaW8uaXRhbGlhLml0L3ByaXZhY3ktcG9saWN5LyIsInRvc191cmkiOiJodHRwczovL2lvLml0YWxpYS5pdC9wcml2YWN5LXBvbGljeS8iLCJsb2dvX3VyaSI6Imh0dHBzOi8vaW8uaXRhbGlhLml0L2Fzc2V0cy9pbWcvaW8taXQtbG9nby13aGl0ZS5zdmcifX0sImlhdCI6MTY5MTM5NjUzMiwiZXhwIjoxNjkxNDAwMTMyfQ.frqGqBswu0pRdM6qQUk5E8ajyzsPuTFObvGFAOxDzDZBJduO8s8ljO9YGmapETqT1BkcpcSktMIN1JqvNEKd-Q';

  const verifyJwtSignature = (jwt: string, publicKey: JWK) => {
    loading();
    isSignatureValid(jwt, publicKey)
      .then((isValid) => {
        isValid
          ? setResult('✅ Signature is valid')
          : setResult('🛑 Invalid signature!');
      })
      .catch(showError);
  };
  const verifyPayload = (jwt: string, publicKey: JWK) => {
    loading();
    verify(jwt, publicKey, {
      currentDate: new Date('2023-07-13T10:30:00.000+02:00'),
      typ: 'entity-statement+jwt',
      requiredClaims: ['iss', 'sub', 'metadata'],
    })
      .then((decodedJwt) => setResult(JSON.stringify(decodedJwt)))
      .catch(showError);
  };

  const encryptPlaintextRsa = (plaintext: String, encKey: JWK) => {
    loading();
    const jwe = new EncryptJwe(plaintext, {
      alg: 'RSA-OAEP-256',
      enc: 'A256CBC-HS512',
    }).encrypt(encKey);
    jwe.then(setResult).catch(showError);
  };

  const encryptPlaintextEcdh = (
    plaintext: String,
    encKey: JWK,
    enc: ConstructorParameters<typeof EncryptJwe>[1]['enc']
  ) => {
    loading();
    const jwe = new EncryptJwe(plaintext, {
      alg: 'ECDH-ES',
      enc,
    }).encrypt(encKey);
    jwe.then(setResult).catch(showError);
  };

  React.useEffect(() => {
    console.log(result);
  }, [result]);

  const verifyWithJwks = () => {
    loading();
    const metadataUrl =
      'https://io-d-wallet-it.azurewebsites.net/.well-known/openid-federation';
    getRemoteJWKSet(metadataUrl)
      .then((jwks) => {
        setResult(JSON.stringify(jwks));
        verify(remoteMetadataJwt, jwks)
          .then((isValid) => {
            isValid
              ? setResult('✅ Signature is valid')
              : setResult('🛑 Invalid signature!');
          })
          .catch(showError);
      })
      .catch(showError);
  };

  const loading = () => setResult('⏱️');

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
          title="JWK thumbprint"
          onPress={() => thumbprint(validJwk).then(setResult).catch(showError)}
        />
        <Button
          title="Generate and sign JWT"
          onPress={() => generateAndSign().catch(showError)}
        />
        <Button
          title="SHA256"
          onPress={() =>
            sha256ToBase64(
              'WyJlbHVWNU9nM2dTTklJOEVZbnN4QV9BIiwgInVuaXF1ZV9pZCIsICJ4eHh4eHh4eC14eHh4LXh4eHgteHh4eC14eHh4eHh4eHh4eHgiXQ'
            )
              .then(setResult)
              .catch(showError)
          }
        />
        <Button
          title="Generate JWE (RSA)"
          onPress={() => encryptPlaintextRsa('hello', encJwk)}
        />
        <Button
          title="Generate JWE (EC A256GCM)"
          onPress={() => encryptPlaintextEcdh('hello', ecEncJwk, 'A256GCM')}
        />
        <Button
          title="Generate JWE (EC A128GCM)"
          onPress={() => encryptPlaintextEcdh('hello', ecEncJwk, 'A128GCM')}
        />
        <Button
          title="Generate JWE (RSA) (WrongKey)"
          onPress={() => encryptPlaintextRsa('hello', ecEncJwk)}
        />
        <Button
          title="Generate JWE (EC) (WrongKey)"
          onPress={() => encryptPlaintextEcdh('hello', encJwk, 'A256GCM')}
        />
        <Button title="Verify with JWKSet" onPress={() => verifyWithJwks()} />
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
