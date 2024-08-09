import { View, Image } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import { bannerData } from "@/constants/constans";
import styles from "./styles";

const Banner = () => {
  return (
    <View style={styles.container}>
      <Swiper
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        autoplay={true}
        autoplayTimeout={5}
      >
        {bannerData.map((item: BannerDataTypes, index: number) => (
          <View key={item.bannerImageUrl} style={styles.slide}>
            <Image
              source={item.bannerImageUrl}
              style={{ width: 400, height: 250 }}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default Banner;
