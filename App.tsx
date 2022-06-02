import * as React from 'react';

import usePlayerCore from './src/hooks/usePlayerCore';
import AudioPlayerUi from './src/components/AudioPlayerUi';

import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title='Go to Details'
        onPress={() => navigation.navigate('Profile')}
      />
      <AudioPlayerUi uri='https://file-examples.com/storage/fe9e2635216297e77988972/2017/11/file_example_MP3_700KB.mp3' />
      <AudioPlayerUi uri='https://filesamples.com/samples/audio/mp3/sample4.mp3' />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  const { play, info } = usePlayerCore();

  console.log(info);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
