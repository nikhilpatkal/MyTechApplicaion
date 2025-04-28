import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [userData, setUserData] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null); // Profile image state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      const email = await AsyncStorage.getItem('email');
      const phone = await AsyncStorage.getItem('phone');
      const profileImage = await AsyncStorage.getItem('profileImage'); // Fetch profile image
      if (name && email && phone) {
        setUserData({ name, email, phone });
        setName(name);
        setEmail(email);
        setPhone(phone);
        setProfileImage(profileImage); // Set the profile image if available
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      if (name && email && phone) {
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('phone', phone);
        if (profileImage) {
          await AsyncStorage.setItem('profileImage', profileImage); // Save the image
        }
        setIsEditing(false);
        fetchUserData(); // Update the UI with the new information
        Alert.alert('Success', 'Profile updated successfully!');
      } else {
        Alert.alert('Error', 'Please fill in all fields');
      }
    } catch (error) {
      console.error('Failed to save user data', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.replace('Login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleImageUpload = () => {
    console.log('Image upload clicked');  // Debugging log to confirm function call
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true, quality: 0.5 },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          // Check if assets exists and has at least one item
          if (response.assets && response.assets.length > 0) {
            const uri: string | undefined = response.assets[0].uri;
            if (uri) {
              setProfileImage(uri);
              AsyncStorage.setItem('profileImage', uri); // Save the image URI
              console.log('Profile image set:', uri);  // Debugging log
            } else {
              console.log('Image URI is undefined');
              setProfileImage(null); // You can reset or handle the null case
              AsyncStorage.removeItem('profileImage');
            }
          } else {
            console.log('No assets found in the response');
            setProfileImage(null); // Reset if no assets
            AsyncStorage.removeItem('profileImage');
          }
        }
      }
    );
  };




  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleImageUpload}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../../assets/images/profile-image.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      ) : (
        <Text style={styles.info}>{userData.name}</Text>
      )}

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      ) : (
        <Text style={styles.info}>{userData.email}</Text>
      )}

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
      ) : (
        <Text style={styles.info}>{userData.phone}</Text>
      )}

      <View style={styles.saveButton}>
        {isEditing ? (
          <Button title="Save" color="#5cb85c" onPress={handleSaveProfile} />
        ) : (
          <Button title="Edit Profile" color="#4CAF50" onPress={() => setIsEditing(true)} />
        )}
      </View>

      <View style={styles.logoutButton}>
        <Button title="Logout" color="#ff5c5c" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    marginTop: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  saveButton: {
    marginTop: 20,
    width: '60%',
  },
  logoutButton: {
    marginTop: 30,
    width: '60%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
});
