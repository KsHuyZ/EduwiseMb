import Loader from "@/components/loader/loader";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import styles from "./styles";

export default function ProfileScreen() {
  const { user, loading, signOut } = useAuth();
  const [image, setImage] = useState<any>(null);
  const [loader, setLoader] = useState(false);

  const logout = async () => {
    await signOut();
    router.push("/(routes)/login");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setLoader(true);
      const base64Image = `data:image/jpeg;base64,${base64}`;
      setImage(base64Image);
    }
  };

  return (
    <>
      {loader || loading ? (
        <Loader />
      ) : (
        <LinearGradient
          colors={["#E5ECF9", "#F6F7F9"]}
          style={styles.background}
        >
          <SafeAreaView>
            <ScrollView>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View style={styles.container}>
                  {image || user?.avatar ? (
                    <Image
                      source={{
                        uri: image || user?.avatar,
                      }}
                      style={styles.avatar}
                    />
                  ) : (
                    <Image
                      source={require("@/assets/images/avatar.jpg")}
                      style={styles.avatar}
                    />
                  )}

                  <TouchableOpacity
                    style={styles.changeAvtBtn}
                    onPress={pickImage}
                  >
                    <Ionicons name="camera-outline" size={25} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.firstName}>{user?.firstName}</Text>
              <View style={{ marginHorizontal: 16, marginTop: 30 }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: 16,
                    fontFamily: "Raleway_700Bold",
                  }}
                >
                  Account Details
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 30,
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 2,
                        borderColor: "#dde2ec",
                        padding: 15,
                        borderRadius: 100,
                        width: 55,
                        height: 55,
                      }}
                    >
                      <FontAwesome
                        style={{ alignSelf: "center" }}
                        name="user-o"
                        size={20}
                        color={"black"}
                      />
                    </View>
                    <View>
                      <Text
                        style={{ fontSize: 16, fontFamily: "Nunito_700Bold" }}
                      >
                        Detail Profile
                      </Text>
                      <Text
                        style={{
                          color: "#575757",
                          fontFamily: "Nunito_400Regular",
                        }}
                      >
                        Information Account
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <AntDesign name="right" size={26} color={"#CBD5E0"} />
                  </TouchableOpacity>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                  onPress={() => router.push("/(routes)/enrolled-courses")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 30,
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 2,
                        borderColor: "#dde2ec",
                        padding: 15,
                        borderRadius: 100,
                        width: 55,
                        height: 55,
                      }}
                    >
                      <MaterialCommunityIcons
                        style={{ alignSelf: "center" }}
                        name="book-account-outline"
                        size={20}
                        color={"black"}
                      />
                    </View>
                    <View>
                      <Text
                        style={{ fontSize: 16, fontFamily: "Nunito_700Bold" }}
                      >
                        Enrolled courses
                      </Text>
                      <Text
                        style={{
                          color: "#575757",
                          fontFamily: "Nunito_400Regular",
                        }}
                      >
                        The all enrolled courses
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <AntDesign name="right" size={26} color={"#CBD5E0"} />
                  </TouchableOpacity>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                  onPress={() => logout()}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 30,
                    }}
                  >
                    <View style={styles.iconLogout}>
                      <Ionicons
                        style={{ alignSelf: "center" }}
                        name="log-out-outline"
                        size={20}
                        color={"black"}
                      />
                    </View>
                    <TouchableOpacity onPress={() => logout()}>
                      <Text style={styles.logOut}>Log Out</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity>
                    <AntDesign name="right" size={26} color={"#CBD5E0"} />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      )}
    </>
  );
}
