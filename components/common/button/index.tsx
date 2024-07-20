import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { commonStyles } from "@/styles/common/common.styles";

interface ButtonProps {
  readonly title: string;
  readonly onPress: () => void;
  readonly loading: boolean;
}

export default function Button({ title, onPress, loading }: ButtonProps) {
  const { width } = Dimensions.get("window");

  return (
    <TouchableOpacity
      style={[
        commonStyles.buttonContainer,
        {
          width: width * 1 - 150,
          height: 40,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        },
      ]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator size="small" color={"white"} />
      ) : (
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 16,
            fontFamily: "Raleway_700Bold",
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
