import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen({
  route,
}: {
  route: {
    params: { username: string; address: string; email: string; phone: string };
  };
}) {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { username, address, email, phone } = route.params;

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.TopContainer}>
            <Text
              style={[
                styles.title,
                { display: "flex", alignItems: "flex-start" },
              ]}
            >
              Welcome, {username} 👋
            </Text>

            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate("Profile")}
            >
              <Ionicons name="person-outline" size={30} color="#4e8cff" />
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={["#ff7e5f", "#feb47b"]}
            style={styles.homecard}
          >
            <View style={[styles.homecard, { flexDirection: "row" }]}>
              <View
                style={{
                  width: "50%",
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Text
                  style={{ color: "black", fontSize: 20, fontWeight: "bold" }}
                >
                  Welcome to the Student Portal
                </Text>
                <Text style={{ color: "black", fontSize: 15, marginTop: 5 }}>
                  Access Government Resources and Updates
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // backgroundColor: "#4e8cff",
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 25,
                    // shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    marginRight: 33,
                    // elevation: 3,
                  }}
                >
                  <Text
                    style={{
                      color: "blue",
                      fontWeight: "600",
                      marginRight: 8,
                      textDecorationColor: "blue",
                      textDecorationLine: "underline",
                    }}
                  >
                    Get Started
                  </Text>
                  <Ionicons
                    name="arrow-forward-circle-outline"
                    size={24}
                    color="blue"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "40%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Image
                  source={require("../../assets/images/img1.png")}
                  style={{ width: 250, height: "80%", marginEnd: 70 }}
                />
              </View>
            </View>
          </LinearGradient>

          {/* //card 000roll */}
          <ScrollView style={{ width: "100%", marginTop: 20 }}>
            <View style={styles.menuContainer}>
              <LinearGradient
                style={styles.cardfeature}
                colors={["#ff7e5f", "#feb47b"]}
              >
                <TouchableOpacity style={styles.card}>
                  <TouchableOpacity style={styles.cardGrid}>
                    <Ionicons name="book-outline" size={50} color="#feb47b" />
                  </TouchableOpacity>
                  <Text style={styles.cardText}>Question Sets</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={styles.cardfeature}
                colors={["#ff7e5f", "#feb47b"]}
              >
                <TouchableOpacity style={styles.card}>
                  <TouchableOpacity style={styles.cardGrid}>
                    <Ionicons name="create-outline" size={50} color="#feb47b" />
                  </TouchableOpacity>
                  <Text style={styles.cardText}>Take Tests</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={styles.cardfeature}
                colors={["#ff7e5f", "#feb47b"]}
              >
                <TouchableOpacity style={styles.card}>
                  <TouchableOpacity style={styles.cardGrid}>
                    <Ionicons
                      name="document-outline"
                      size={50}
                      color="#feb47b"
                    />
                  </TouchableOpacity>
                  <Text style={styles.cardText}>Download Notes</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={styles.cardfeature}
                colors={["#ff7e5f", "#feb47b"]}
              >
                <TouchableOpacity style={styles.card}>
                  <TouchableOpacity style={styles.cardGrid}>
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={50}
                      color="#feb47b"
                    />
                  </TouchableOpacity>
                  <Text style={styles.cardText}>Ask Query</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ScrollView>
          <ScrollView style={{ width: "100%", marginTop: 20 }} >
            <View style={{ width: "100%", marginTop: 20 }}>
              <Text
                style={[
                  {
                    textAlign: "left",
                    alignSelf: "flex-start",
                    paddingLeft: 20,
                    fontSize: 20,
                    fontWeight: "bold",
                    marginTop: 20,
                  },
                ]}
              >
                Latest Exam Updates
              </Text>
              <View
                style={{
                  // width: "100%",
                  marginTop: 10,
                  margin: 20,
                  padding: 10,
                  borderBlockColor: "#ce1010",
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#feb47b",
                  height: 'auto',
                  // backgroundColor: "pink",
                }}
              >
                <View style={styles.daysBadge}>
                  <Text style={styles.daysText}>15 Days Left</Text>
                </View>

                {/* Exam Content */}
                <View style={styles.detailsSection}>
                  <Text style={styles.examTitle}>UPSC Civil Services</Text>
                  <Text style={styles.examSubtitle}>Preliminary Exam</Text>

                  <View style={styles.dateContainer}>
                    <MaterialIcons
                      name="calendar-today"
                      size={16}
                      color="#555"
                    />
                    <Text style={styles.examDate}>12 June, 2023</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  // width: "100%",
                  marginTop: 10,
                  margin: 20,
                  padding: 10,
                  // borderBlockColor: "#ce1010",
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#feb47b",
                  height: 'auto',
                  // backgroundColor: "pink",
                }}
              >
                <View style={styles.daysBadge}>
                  <Text style={styles.daysText}>15 Days Left</Text>
                </View>

                {/* Exam Content */}
                <View style={styles.detailsSection}>
                  <Text style={styles.examTitle}>UPSC Civil Services</Text>
                  <Text style={styles.examSubtitle}>Preliminary Exam</Text>

                  <View style={styles.dateContainer}>
                    <MaterialIcons
                      name="calendar-today"
                      size={16}
                      color="#555"
                    />
                    <Text style={styles.examDate}>12 June, 2023</Text>
                  </View>
                </View>
              </View>
            </View>

          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    // paddingVertical: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    paddingTop: 20,
  },
  homecard: {
    height: 190,
    width: "95%",
    backgroundColor: "transparent",
    borderRadius: 7,
    justifyContent: "center",
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  card: {
    width: 140,
    height: 140,
    backgroundColor: "transparent",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#4a4954",
    textAlign: "center",
  },
  profileButton: {
    padding: 8,
    borderRadius: 30,
    backgroundColor: "#d3d3d3",
  },
  TopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  cardGrid: {
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "gray",
    padding: 12,
  },
  cardfeature: {
    borderRadius: 12,
  },
  daysBadge: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#ffe5e5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  daysText: {
    color: "#c0392b",
    fontWeight: "bold",
    fontSize: 12,
  },
  detailsSection: {
    marginTop: 10,
  },
  examTitle: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "bold",
  },
  examSubtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 4,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  examDate: {
    marginLeft: 6,
    color: "#555",
    fontSize: 13,
  },
});
