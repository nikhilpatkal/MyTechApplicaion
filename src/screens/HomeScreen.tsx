import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome, Student {}👋</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="book-outline" size={50} color="#4e8cff" />
          <Text style={styles.cardText}>Question Sets</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="create-outline" size={50} color="#4e8cff" />
          <Text style={styles.cardText}>Take Tests</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="document-outline" size={50} color="#4e8cff" />
          <Text style={styles.cardText}>Download Notes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={50}
            color="#4e8cff"
          />
          <Text style={styles.cardText}>Ask Query</Text>
        </TouchableOpacity>

        {/* Profile Card */}
        {/* <TouchableOpacity style={styles.card} onPress={handleLogout}>
          <Ionicons name="person-outline" size={50} color="#4e8cff" />
          <Text style={styles.cardText}>Profile & Logout</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={50} color="#4e8cff" />
          <Text style={styles.cardText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    paddingTop: 20,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  card: {
    width: 140,
    height: 140,
    backgroundColor: '#e8f0fe',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    elevation: 5,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
