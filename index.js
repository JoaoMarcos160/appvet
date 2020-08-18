import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

export default function App() {
  const [cases, setCases] = useState(null);


  useEffect( () => {
    request();
  },[cases]);

  const request = async () => {
    const response = await fetch('https://covid19-brazil-api.now.sh/api/report/v1/brazil');
    const parsed = await response.json();
    setCases(parsed.data.recovered);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.paragraph}>Casos Curados</Text>
        <Text style={styles.paragraph}>{cases}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});