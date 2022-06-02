import * as React from 'react';

import create from 'zustand';

import { Audio } from 'expo-av';

import type { AVPlaybackStatusToSet } from 'expo-av';

interface PlayerCoreStoreInfo {
  isLoaded: boolean;
  duration: number;
  rate: number;
  position: number;
  volume: number;
  isMuted: boolean;
  isPlaying: boolean;
}

interface PlayerCoreStore {
  sound: Audio.Sound | null;
  setSound: (sound: Audio.Sound | null) => void;
  info: PlayerCoreStoreInfo;
  setInfo: (info: PlayerCoreStoreInfo) => void;
}

export const usePlayerCoreStore = create<PlayerCoreStore>((set) => ({
  sound: null,
  setSound: (sound) => set({ sound }),
  info: {
    isLoaded: false,
    duration: 0,
    rate: 1,
    position: 0,
    volume: 1,
    isMuted: false,
    isPlaying: false,
  },
  setInfo: (info) => set({ info }),
}));

const usePlayerCore = () => {
  const { sound, setSound, info, setInfo } = usePlayerCoreStore();

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const play = React.useCallback(
    async (
      uri: string,
      config: AVPlaybackStatusToSet | undefined = undefined
    ) => {
      if (sound) {
        await sound.unloadAsync();
      }

      Audio.Sound.createAsync(
        {
          uri,
        },
        {
          ...config,
          shouldPlay: true,
        }
      ).then(({ sound }) => {
        sound.setOnPlaybackStatusUpdate((status) => {
          console.log(status);
          if ('error' in status) {
            // Create snackbar or error notification
            console.log(status.error);
          } else if ('uri' in status) {
            setInfo({
              ...info,
              isLoaded: status.isLoaded,
              duration: status.durationMillis ?? 0,
              rate: status.rate,
              position: status.positionMillis,
              volume: status.volume,
              isMuted: status.isMuted,
              isPlaying: status.isPlaying,
            });
          }
        });
        setSound(sound);
      });
    },
    [sound]
  );

  const resume = React.useCallback(() => {
    if (sound) {
      sound.playAsync();
    }
  }, [sound]);

  const pause = React.useCallback(() => {
    if (sound) {
      sound.pauseAsync();
    }
  }, [sound]);

  const seekForward = React.useCallback(() => {
    if (sound) {
      sound.setPositionAsync(info.position + 5000);
    }
  }, [sound, info]);

  const seekBackward = React.useCallback(() => {
    if (sound) {
      sound.setPositionAsync(info.position - 5000);
    }
  }, [sound, info]);

  const adjustVolume = React.useCallback(
    (volume: number) => {
      if (sound) {
        sound.setVolumeAsync(volume);
      }
    },
    [sound]
  );

  return { play, resume, pause, info, seekForward, seekBackward, adjustVolume };
};

export default usePlayerCore;
