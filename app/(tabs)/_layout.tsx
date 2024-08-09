import React from "react";
import { Redirect, Tabs } from "expo-router";
import { Image, Text } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Redirect href="/(routes)/login" />;
  }

  return (
    <Tabs
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === "index") {
              iconName = require("@/assets/icons/HouseSimple.png");
            } else if (route.name === "search/index") {
              iconName = require("@/assets/icons/search.png");
            } else if (route.name === "courses/index") {
              iconName = require("@/assets/icons/BookBookmark.png");
            } else if (route.name === "profile/index") {
              iconName = require("@/assets/icons/User.png");
            }
            return (
              <Image
                style={{ width: 25, height: 25, tintColor: color }}
                source={iconName}
              />
            );
          },
          headerShown: false,
          tabBarShowLabel: false,
        };
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search/index" />
      <Tabs.Screen name="courses/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}
