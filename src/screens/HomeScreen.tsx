import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen({ route }: { route: { params: { username: string; address: string; email: string; phone: string } } }) {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { username, address, email, phone } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={styles.TopContainer}
      >
        <Text style={[styles.title,{display:'flex',alignItems:'flex-start'}]}>Welcome, {username} 👋</Text>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={30} color="#4e8cff" />
        </TouchableOpacity>
      </View>

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
  profileButton: {
    padding: 8,
    borderRadius: 30,
    backgroundColor: '#d3d3d3',
  },
  TopContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  }



});
