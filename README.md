# Soundscape Mixer

Soundscape Mixer is a mobile application built with React Native and Expo that allows users to mix ambient sounds—such as atmosphere, birdsong, white noise, and crickets—to create a personalized soundscape for relaxation, meditation, or focus. The app features a user-friendly interface with individual volume sliders, a session timer, and a light, nature-inspired theme. Soundscape Mixer was bbuilt with some of my own struggles in mind, as I'm someone who regularly struggles to fall asleep. Soundscape Mixer was an app built for my own benefit, allowing me to freely use whatever sounds I like for whatever duration to help me relax. 

## Features

- **Ambient Sound Mixing:**  
  Mix multiple ambient sounds by adjusting individual volume sliders.

- **Customisability:**  
  Easily add new sounds with only one line of code in index.tsx.
  
- **Session Timer:**  
  Set a timer (in minutes) to automatically stop playback after a desired duration. Once the timer is done, it plays a friendly alarm sound to remind you. 

- **Modern UI:**  
  A light, nature-inspired design with a custom font ("Helmet") and natural green accents.

- **Cross-Platform:**  
  Developed with React Native and Expo, ensuring compatibility with both iOS and Android devices.

## Tools and Technologies Used

- **React Native & Expo:**  
  Provides a fast and efficient framework for building cross-platform mobile apps.

- **expo-av:**  
  Enables audio playback functionality, including looping and volume control for ambient sounds.

- **react-native-paper:**  
  Implements Material Design components to build a clean and modern UI.

- **expo-font:**  
  Loads and applies custom fonts within the app.

- **@react-native-community/slider:**  
  Offers a smooth slider component for controlling sound volumes.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ShafeiW/SoundscapeMixer.git
   cd soundscape-mixer
   ```
2. **Install Dependencies:**   

   ```bash
   npm install
   ```

3. **Install Expo CLI (if not already installed):** 

   ```bash
   npm install -g expo-cli
   ```

## Running the Project 

1. **Start the Expo Server:**

   ```bash
   npx expo start -c
   ```

2. **Run on a Device or Emulator:**
iOS: Use the Expo Go app or run on an iOS simulator.
Android: Use the Expo Go app or run on an Android emulator.

## Screenshots 
![Main Interface](screenshots/mixer1.png)
![Main Interface](screenshots/mixer2.png)
