import * as React from 'react';

import usePlayerCore from '../../hooks/usePlayerCore';

import { View, Button } from 'react-native';

interface AudioPlayerUiProps {
  uri: string;
}

const AudioPlayerUi: React.FC<AudioPlayerUiProps> = ({ uri }) => {
  const { play, info } = usePlayerCore();

  return (
    <View>
      <Button title='Play' onPress={() => play(uri)} />
      <Button title='Pause' />
    </View>
  );
};

export default AudioPlayerUi;
