import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/hooks/useAuth";
import styles from "./styles";

export default function Header() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const subscription = async () => {
      const cart: any = await AsyncStorage.getItem("cart");
      setCartItems(JSON.parse(cart) ?? []);
    };
    subscription();
  }, []);

  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
          <Image
            source={
              user?.avatar ? user.avatar : require("@/assets/images/avatar.jpg")
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <View>
          <Text style={[styles.helloText, { fontFamily: "Raleway_700Bold" }]}>
            Hello,
          </Text>
          <Text style={[styles.text, { fontFamily: "Raleway_700Bold" }]}>
            {user?.firstName}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.bellButton}
        onPress={() => router.push("/(routes)/cart")}
      >
        <View>
          <Feather name="shopping-cart" size={26} color={"black"} />
          {cartItems.length > 0 && (
            <View style={styles.bellContainer}>
              <Text style={{ color: "#fff", fontSize: 14 }}>
                {cartItems.length}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
