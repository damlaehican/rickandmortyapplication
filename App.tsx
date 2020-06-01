import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import AppContainer from './src/components/AppContainer'


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppContainer />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
