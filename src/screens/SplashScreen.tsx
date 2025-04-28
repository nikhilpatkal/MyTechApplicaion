import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

type SplashScreenProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenProp>();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000); // 2 seconds splash delay
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/splesh-screen01.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to My App!</Text>
        <ActivityIndicator size="large" style={{marginTop:40}}  color={'white'} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    // backgroundColor: 'rgba(37, 132, 227, 0.5)', // semi-transparent dark background
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
