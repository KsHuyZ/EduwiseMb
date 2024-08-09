import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/header/header";
import SearchInput from "@/components/common/search.input";
import Banner from "./components/banner";
import AllCourses from "./components/courses";

export default function HomeScreen() {
  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]}>
      <SafeAreaView>
        <Header />
        <SearchInput homeScreen={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Banner />
          <AllCourses />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({});
