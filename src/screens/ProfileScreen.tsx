import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [userData, setUserData] = useState<{ username: string; email: string; phone: string } | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const { username, email, phone } = JSON.parse(storedUser);
        const profileImage = await AsyncStorage.getItem('profileImage');
        setUserData({ username, email, phone });
        setName(username);
        setEmail(email);
        setPhone(phone);
        setProfileImage(profileImage);
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      if (name && email && phone) {
        const updatedUser = { username: name, email, phone };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        if (profileImage) await AsyncStorage.setItem('profileImage', profileImage);
        setIsEditing(false);
        fetchUserData();
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
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          navigation.replace('Login');
        },
      },
    ]);
  };

  const handleImageUpload = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: true, quality: 0.5 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri: string | undefined = response.assets?.[0]?.uri;
        if (uri) {
          setProfileImage(uri);
          AsyncStorage.setItem('profileImage', uri);
          console.log('Profile image set:', uri);
        }
      }
    });
  };

  if (!userData) {
    return (
      <View style={styles.container}>
      <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={24} color="#333" />
    </TouchableOpacity>
      <View style={styles.container}>
        <Text>Loading Profile...</Text>
      </View>
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
          source={
            profileImage
              ? { uri: profileImage }
              : require("../../assets/images/profile-image.png")
          }
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </>
      ) : (
        <>
          <Text style={styles.info}>{userData.username}</Text>
          <Text style={styles.info}>{userData.email}</Text>
          <Text style={styles.info}>{userData.phone}</Text>
        </>
      )}

      <View style={styles.saveButton}>
        {isEditing ? (
          <TouchableOpacity style={styles.saveTouchable} onPress={handleSaveProfile}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editProfileTouchable} onPress={() => setIsEditing(true)}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>

        )}
      </View>
a
      <View style={styles.logoutButton}>
        <TouchableOpacity style={styles.logoutTouchable} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  saveTouchable: {
    backgroundColor: '#5cb85c',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editProfileTouchable: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editProfileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  logoutTouchable: {
    backgroundColor: '#ff5c5c',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
