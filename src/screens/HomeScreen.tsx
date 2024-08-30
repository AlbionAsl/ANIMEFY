// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../utils/ThemeContext';
import { logger } from '../utils/logger';

const HomeScreen: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const { colors } = useTheme();

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        if (selectedAsset.uri) {
          const fileExtension = selectedAsset.uri.split('.').pop()?.toLowerCase();
          if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
            setImage(selectedAsset.uri);
            logger.info('Image selected successfully');
          } else {
            Alert.alert('Invalid file type', 'Please select a JPEG or PNG image.');
            logger.warn('Invalid file type selected');
          }
        }
      } else {
        logger.info('Image selection cancelled');
      }
    } catch (error) {
      logger.error('Error picking image:', error);
      Alert.alert('Error', 'An error occurred while selecting the image. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Animify</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={pickImage}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>Select Image</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});

export default HomeScreen;