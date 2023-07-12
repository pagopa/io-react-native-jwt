import * as React from 'react';

import { StyleSheet, View, Text, SafeAreaView, Button } from 'react-native';
import { decode } from '@pagopa/io-react-native-jwt';
import type { JWTDecodeResult } from 'src/types';

export default function App() {
  const [result, setResult] = React.useState<JWTDecodeResult | undefined>();
  const demoJwt =
    'eyJ0eXAiOiJlbnRpdHktc3RhdGVtZW50K2p3dCIsImtpZCI6IkVDIzEiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJodHRwczovL2lvLWQtd2FsbGV0LWl0LmF6dXJld2Vic2l0ZXMubmV0LyIsInN1YiI6Imh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvIiwibWV0YWRhdGEiOnsiZXVkaV93YWxsZXRfcHJvdmlkZXIiOnsiandrcyI6W3siY3J2IjoiUC0yNTYiLCJrdHkiOiJFQyIsIngiOiJxckpyajNBZl9CNTdzYk9JUnJjQk03YnI3d09jOHluajdsSEZQVGVmZlVrIiwieSI6IjFIMGNXRHlHZ3ZVOHcta1BLVV94eWNPQ1VOVDJvMGJ3c2xJUXRuUFU2aU0iLCJraWQiOiJFQyMxIn1dLCJ0b2tlbl9lbmRwb2ludCI6Imh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvdG9rZW4iLCJhc2NfdmFsdWVzX3N1cHBvcnRlZCI6WyJodHRwczovL2lvLWQtd2FsbGV0LWl0LmF6dXJld2Vic2l0ZXMubmV0L0xvQS9iYXNpYyIsImh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvTG9BL21lZGl1bSIsImh0dHBzOi8vaW8tZC13YWxsZXQtaXQuYXp1cmV3ZWJzaXRlcy5uZXQvTG9BL2hpZ2h0Il0sImdyYW50X3R5cGVzX3N1cHBvcnRlZCI6WyJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1rZXktYXR0ZXN0YXRpb24iXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2RzX3N1cHBvcnRlZCI6WyJwcml2YXRlX2tleV9qd3QiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9zaWduaW5nX2FsZ192YWx1ZXNfc3VwcG9ydGVkIjpbIkVTMjU2IiwiRVMyNTZLIiwiRVMzODQiLCJFUzUxMiIsIlJTMjU2IiwiUlMzODQiLCJSUzUxMiIsIlBTMjU2IiwiUFMzODQiLCJQUzUxMiJdfSwiZmVkZXJhdGlvbl9lbnRpdHkiOnsib3JnYW5pemF0aW9uX25hbWUiOiJQYWdvUGEgUy5wLkEuIiwiaG9tZXBhZ2VfdXJpIjoiaHR0cHM6Ly9pby5pdGFsaWEuaXQvIiwicG9saWN5X3VyaSI6Imh0dHBzOi8vaW8uaXRhbGlhLml0L3ByaXZhY3ktcG9saWN5LyIsInRvc191cmkiOiJodHRwczovL2lvLml0YWxpYS5pdC9wcml2YWN5LXBvbGljeS8iLCJsb2dvX3VyaSI6Imh0dHBzOi8vaW8uaXRhbGlhLml0L2Fzc2V0cy9pbWcvaW8taXQtbG9nby13aGl0ZS5zdmcifX0sImlhdCI6MTY4OTA4NTU2MSwiZXhwIjoxNjg5MDg5MTYxfQ.ejP5rSnwIX2sG5X_fKwqLf3yPUMYJCUBq8VhdRtsdNCaUvn7IaubxqKilsDkz6Wv24h61DSf-5eqa3UkppgXxg';

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="Decode JWT"
          onPress={() => decode(demoJwt).then(setResult)}
        />
      </View>
      <View>
        <Text style={styles.title}>{JSON.stringify(result)}</Text>
      </View>
    </SafeAreaView>
  );
}

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
