import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import styles from "./styles";

type InputProps = {
  label?: string;
  error?: string;
  leftIcon?: Icon<any, any>;
  nameLeftIcon?: string;
  rightIcon?: any;
  type?: "password" | "default";
} & React.ComponentPropsWithRef<typeof TextInput>;

const Input = ({
  type,
  rightIcon,
  leftIcon: LeftIcon,
  error,
  label,
  nameLeftIcon,
  ...rest
}: InputProps) => {
  const [visible, setVisible] = useState(false);

  const getIcon = useCallback(() => {
    if (type === "password") {
      return visible ? (
        <Ionicons name="eye-off-outline" size={23} color={"#747474"} />
      ) : (
        <Ionicons name="eye-outline" size={23} color={"#747474"} />
      );
    } else {
      return <Ionicons name={rightIcon} size={23} color={"#747474"} />;
    }
  }, [type]);

  return (
    <View style={{ flexDirection: "column", alignItems: "stretch" }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View>
        <TextInput
          style={[
            styles.input,
            error
              ? {
                  borderWidth: 1,
                  borderColor: "red",
                }
              : {},
            LeftIcon
              ? {
                  paddingLeft: 35,
                }
              : {},
          ]}
          secureTextEntry={type === "password" && !visible}
          {...rest}
        />
        <TouchableOpacity
          style={styles.visibleIcon}
          onPress={() => setVisible((prev) => !prev)}
        >
          {getIcon()}
        </TouchableOpacity>
        {LeftIcon && (
          <LeftIcon
            name={nameLeftIcon}
            style={styles.icon2}
            size={20}
            color={"#A1A1A1"}
          />
        )}
      </View>
      {error && (
        <View style={[styles.errorContainer]}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;
