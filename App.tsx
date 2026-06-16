import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AudioProvider} from './src/audio/AudioContext';
import {RootNavigator} from './src/navigation/RootNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#07070D" />
      <AudioProvider>
        <RootNavigator />
      </AudioProvider>
    </SafeAreaProvider>
  );
}

export default App;
