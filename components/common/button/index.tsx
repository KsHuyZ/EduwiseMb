import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";

interface ButtonProps {
  readonly title: string;
  readonly onPress: () => void;
  readonly loading: boolean;
}

export default function Button({ title, onPress, loading }: ButtonProps) {
  return (
    <TouchableOpacity
      style={{ padding: 16, borderRadius: 8, backgroundColor: "#2467EC" }}
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
