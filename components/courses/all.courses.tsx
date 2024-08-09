import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import CourseCard from "@/components/cards/course-card";
import { CourseType } from "@/types";

export default function AllCourses() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${SERVER_URI}/get-courses`)
      .then((res: any) => {
        setCourses(res.data.courses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000000",
            fontFamily: "Raleway_700Bold",
          }}
        >
          Popular courses
        </Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/courses")}>
          <Text
            style={{
              fontSize: 15,
              color: "#2467EC",
              fontFamily: "Nunito_600SemiBold",
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={courses}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard item={item} />}
      />
    </View>
  );
}
