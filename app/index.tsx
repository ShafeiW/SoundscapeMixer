// app/index.tsx
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, Platform, Image, View, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider, Appbar, Card, Button, TextInput } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { useFonts } from 'expo-font';

const soundAssets = [
  { name: 'Atmosphere', uri: require('../assets/atmosphere.mp3') },
  { name: 'Birdsong', uri: require('../assets/birdsong.mp3') },
  { name: 'White Noise', uri: require('../assets/whitenoise.mp3') },
  { name: 'Crickets', uri: require('../assets/crickets.mp3') },
];

export default function SoundscapeMixer() {
  // Load the custom "Helmet" font
  const [fontsLoaded] = useFonts({
    Helmet: require('../assets/fonts/Helmet-Regular.ttf'),
  });

  // Until the fonts load, render a full-screen ActivityIndicator.
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8BC34A" />
      </View>
    );
  }

  // All hooks are called unconditionally below
  const [sounds, setSounds] = useState<any[]>([]);
  const [timer, setTimer] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function loadSounds() {
      const loadedSounds: any[] = [];
      for (let asset of soundAssets) {
        const { sound } = await Audio.Sound.createAsync(
          asset.uri,
          { volume: 0.5, isLooping: true }
        );
        loadedSounds.push({ ...asset, sound, volume: 0.5 });
      }
      setSounds(loadedSounds);
    }
    loadSounds();

    // Cleanup: unload sounds on unmount
    return () => {
      sounds.forEach(async (item) => {
        if (item.sound) await item.sound.unloadAsync();
      });
    };
  }, []);

  const handleVolumeChange = async (index: number, newVolume: number) => {
    const updatedSounds = [...sounds];
    updatedSounds[index].volume = newVolume;
    setSounds(updatedSounds);
    if (updatedSounds[index].sound) {
      await updatedSounds[index].sound.setVolumeAsync(newVolume);
    }
  };

  const startSession = async () => {
    for (let soundItem of sounds) {
      if (soundItem.sound) await soundItem.sound.playAsync();
    }
    const duration = parseFloat(timer);
    if (duration > 0) {
      timerRef.current = setTimeout(() => stopSession(), duration * 60000);
    }
  };

  const stopSession = async () => {
    for (let soundItem of sounds) {
      if (soundItem.sound) await soundItem.sound.stopAsync();
    }
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <PaperProvider theme={theme}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action
          icon={() => (
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          )}
          onPress={() => {}}
        />
        <Appbar.Content
          title="Soundscape Mixer"
          subtitle="Nature's Symphony"
          titleStyle={styles.appbarTitle}
          subtitleStyle={styles.appbarSubtitle}
        />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        {sounds.map((soundItem, index) => (
          <Card key={index} style={styles.card}>
            <Card.Title title={soundItem.name} titleStyle={styles.cardTitle} />
            <Card.Content>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={soundItem.volume}
                onValueChange={(value) => handleVolumeChange(index, value)}
                minimumTrackTintColor="#8BC34A"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#8BC34A"
              />
            </Card.Content>
          </Card>
        ))}
        <Card style={styles.card}>
          <Card.Title title="Session Timer" titleStyle={styles.cardTitle} />
          <Card.Content>
            <TextInput
              mode="outlined"
              label="Minutes"
              value={timer}
              onChangeText={setTimer}
              keyboardType="numeric"
              placeholder="e.g. 30"
              style={styles.input}
              theme={{ colors: { text: '#333333', placeholder: '#777777', primary: '#8BC34A' } }}
            />
          </Card.Content>
        </Card>
        <Card style={[styles.card, styles.buttonCard]}>
          <Card.Content style={styles.buttonContainer}>
            <Button mode="contained" onPress={startSession} style={styles.button} icon="play">
              Start
            </Button>
            <Button
              mode="contained"
              onPress={stopSession}
              style={styles.button}
              icon="stop"
              color="#E57373"
            >
              Stop
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
}

const theme = {
  dark: false,
  roundness: 8,
  colors: {
    primary: '#8BC34A',    // soft nature green
    accent: '#E57373',     // gentle red for stop action
    background: '#FAF9F6', // light off-white
    surface: '#FFFFFF',    // white cards
    text: '#333333',       // dark text for readability
    disabled: '#BDBDBD',
    placeholder: '#777777',
    backdrop: '#000000',
  },
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
  },
  appbar: {
    backgroundColor: '#E8F5E9', // light greenish background for a nature feel
  },
  logo: {
    width: 30,
    height: 30,
  },
  appbarTitle: {
    fontFamily: 'Helmet',
    color: '#333333',
    fontSize: 22,
    fontWeight: '600',
  },
  appbarSubtitle: {
    color: '#4CAF50',
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    padding: 16,
  },
  card: {
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontFamily: 'Helmet',
    color: '#333333',
    fontSize: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  input: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    color: '#333333',
  },
  buttonCard: {
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
