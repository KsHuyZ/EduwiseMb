import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import CourseCard from "@/components/cards/course-card";
import styles from "./styles";
import { useCourse } from "./hooks";

export default function AllCourses() {
  const flatListRef = useRef(null);
  const { data: courses, isLoading } = useCourse();
  console.log({ courses: courses?.items.map((course) => course) });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.popularText}>Popular courses</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/courses")}>
          <Text style={styles.seeAllBtn}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={courses?.items}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard item={item} />}
      />
    </View>
  );
}
