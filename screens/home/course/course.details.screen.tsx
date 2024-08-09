import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import CourseLesson from "@/components/courses/course.lesson";
import ReviewCard from "@/components/cards/review.card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "@/components/loader/loader";
import { CourseType, ICategory } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import WebView from "react-native-webview";

export default function CourseDetailScreen() {
  const [activeButton, setActiveButton] = useState("About");
  const { user, loading } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const { item } = useLocalSearchParams();
  const courseData: CourseType = JSON.parse(item as string);
  const [checkPurchased, setCheckPurchased] = useState(false);

  // useEffect(() => {
  //   if (user?.courses?.find((i: any) => i._id === courseData?.id)) {
  //     setCheckPurchased(true);
  //   }
  // }, [user]);

  const handleAddToCart = async () => {
    const existingCartData = await AsyncStorage.getItem("cart");
    const cartData = existingCartData ? JSON.parse(existingCartData) : [];
    const itemExists = cartData.some((item: any) => item._id === courseData.id);
    if (!itemExists) {
      cartData.push(courseData);
      await AsyncStorage.setItem("cart", JSON.stringify(cartData));
    }
    router.push("/(routes)/cart");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <LinearGradient
          colors={["#E5ECF9", "#F6F7F9"]}
          style={{ flex: 1, paddingTop: 15 }}
        >
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 40,
                  // justifyContent: "space-between",
                  marginHorizontal: 16,
                }}
              >
                {/* <TouchableOpacity>
                  <Entypo name="chevron-left" size={30} />
                </TouchableOpacity> */}
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  Details
                </Text>
                <View />
              </View>
              <View style={{ marginHorizontal: 16 }}>
                <View
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    backgroundColor: "#FFB013",
                    borderRadius: 54,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    marginTop: 8,
                    marginLeft: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 14,
                      fontFamily: "Nunito_600SemiBold",
                    }}
                  >
                    Best Seller
                  </Text>
                </View>
                <View style={{ position: "absolute", zIndex: 14, right: 0 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#141517",
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 3,
                      marginTop: 8,
                      marginRight: 8,
                    }}
                  >
                    <FontAwesome name="star" size={14} color={"#FFB800"} />
                    <Text
                      style={{
                        color: "white",
                        marginLeft: 4,
                        fontFamily: "Nunito_600SemiBold",
                      }}
                    >
                      {/* {courseData?.ratings} */}5
                    </Text>
                  </View>
                </View>
                <Image
                  source={{ uri: courseData?.file.url }}
                  style={{ width: "100%", height: 230, borderRadius: 6 }}
                />
              </View>
              <Text
                style={{
                  marginHorizontal: 16,
                  marginTop: 15,
                  fontSize: 20,
                  fontWeight: "600",
                  fontFamily: "Raleway_700Bold",
                }}
              >
                {courseData?.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: 10,
                  paddingTop: 5,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 22,
                      marginLeft: 10,
                      paddingVertical: 10,
                    }}
                  >
                    ${courseData?.price}
                  </Text>
                  <Text
                    style={{
                      color: "#808080",
                      fontSize: 20,
                      marginLeft: 10,
                      textDecorationLine: "line-through",
                    }}
                  >
                    ${courseData?.price}
                  </Text>
                </View>
                <Text style={{ fontSize: 15 }}>
                  {/* {courseData?.purchased}  */}5 students
                </Text>
              </View>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  Course Prerequisites
                </Text>
                {courseData?.categories.map(
                  (item: ICategory, index: number) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        width: "95%",
                        paddingVertical: 5,
                      }}
                    >
                      <Ionicons name="checkmark-done-outline" size={18} />
                      <Text style={{ paddingLeft: 5, fontSize: 16 }}>
                        {item.name}
                      </Text>
                    </View>
                  )
                )}
              </View>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  Course Benefits
                </Text>
                {/* {courseData?.benefits.map((item: BenefitType, index: number) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    width: "95%",
                    paddingVertical: 5,
                  }}
                >
                  <Ionicons name="checkmark-done-outline" size={18} />
                  <Text style={{ paddingLeft: 5, fontSize: 16 }}>
                    {item.title}
                  </Text>
                </View>
              ))} */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 25,
                  marginLeft: 16,
                  backgroundColor: "#E1E9F8",
                  borderRadius: 50,
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 42,
                    backgroundColor:
                      activeButton === "About" ? "#2467EC" : "transparent",
                    borderRadius: activeButton === "About" ? 50 : 0,
                  }}
                  onPress={() => setActiveButton("About")}
                >
                  <Text
                    style={{
                      color: activeButton === "About" ? "#fff" : "#000",
                      fontFamily: "Nunito_600SemiBold",
                    }}
                  >
                    About
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 42,
                    backgroundColor:
                      activeButton === "Lessons" ? "#2467EC" : "transparent",
                    borderRadius: activeButton === "Lessons" ? 50 : 0,
                  }}
                  onPress={() => setActiveButton("Lessons")}
                >
                  <Text
                    style={{
                      color: activeButton === "Lessons" ? "#fff" : "#000",
                      fontFamily: "Nunito_600SemiBold",
                    }}
                  >
                    Lessons
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 42,
                    backgroundColor:
                      activeButton === "Reviews" ? "#2467EC" : "transparent",
                    borderRadius: activeButton === "Reviews" ? 50 : 0,
                  }}
                  onPress={() => setActiveButton("Reviews")}
                >
                  <Text
                    style={{
                      color: activeButton === "Reviews" ? "#fff" : "#000",
                      fontFamily: "Nunito_600SemiBold",
                    }}
                  >
                    Reviews
                  </Text>
                </TouchableOpacity>
              </View>
              {activeButton === "About" && (
                <View
                  style={{
                    marginHorizontal: 16,
                    marginVertical: 25,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text style={{ fontSize: 18, fontFamily: "Raleway_700Bold" }}>
                    About course
                  </Text>
                  <WebView
                    originWhitelist={["*"]}
                    source={{
                      html: courseData?.description,
                    }}
                  />
                  {courseData?.description.length > 302 && (
                    <TouchableOpacity
                      style={{ marginTop: 3 }}
                      onPress={() => setIsExpanded(!isExpanded)}
                    >
                      <Text
                        style={{
                          color: "#2467EC",
                          fontSize: 14,
                        }}
                      >
                        {isExpanded ? "Show Less" : "Show More"}
                        {isExpanded ? "-" : "+"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {activeButton === "Lessons" && (
                <View style={{ marginHorizontal: 16, marginVertical: 25 }}>
                  <CourseLesson courseDetails={courseData} />
                </View>
              )}
              {activeButton === "Reviews" && (
                <View style={{ marginHorizontal: 16, marginVertical: 25 }}>
                  <View style={{ rowGap: 25 }}>
                    {/* {courseData?.reviews?.map(
                    (item: ReviewType, index: number) => (
                      <ReviewCard item={item} key={index} />
                    )
                  )} */}
                  </View>
                </View>
              )}
            </ScrollView>
            <View
              style={{
                marginHorizontal: 16,
                paddingVertical: 11,
                marginBottom: 10,
                // backdrop
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#2467EC",
                  paddingVertical: 16,
                  borderRadius: 4,
                }}
                onPress={() =>
                  router.push({
                    pathname: "/(routes)/course-access",
                    params: { courseData: JSON.stringify(courseData) },
                  })
                }
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#FFFF",
                    fontSize: 16,
                    fontFamily: "Nunito_600SemiBold",
                  }}
                >
                  Go to the course
                </Text>
              </TouchableOpacity>
              {/* {checkPurchased === true ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#2467EC",
                    paddingVertical: 16,
                    borderRadius: 4,
                  }}
                  onPress={() =>
                    router.push({
                      pathname: "/(routes)/course-access",
                      params: { courseData: JSON.stringify(courseData) },
                    })
                  }
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#FFFF",
                      fontSize: 16,
                      fontFamily: "Nunito_600SemiBold",
                    }}
                  >
                    Go to the course
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#2467EC",
                    paddingVertical: 16,
                    borderRadius: 4,
                  }}
                  onPress={() => handleAddToCart()}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#FFFF",
                      fontSize: 16,
                      fontFamily: "Nunito_600SemiBold",
                    }}
                  >
                    Add to cart
                  </Text>
                </TouchableOpacity>
              )} */}
            </View>
          </SafeAreaView>
        </LinearGradient>
      )}
    </>
  );
}
