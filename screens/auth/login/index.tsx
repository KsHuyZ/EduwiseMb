import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { Fontisto, SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast } from "react-native-toast-notifications";
import styles from "./styles";
import Input from "@/components/common/input";
import { useSignIn } from "./hooks";
import { TSignInCredentials } from "@/types";
import { signInSchema } from "@/validator";
import Button from "@/components/common/button";
import { useAuth } from "@/hooks/useAuth";

export default function LoginScreen() {
  const { mutateAsync: signIn, isPending } = useSignIn();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TSignInCredentials>({
    resolver: zodResolver(signInSchema),
  });
  const { setUser } = useAuth();

  const onSubmit = async (values: TSignInCredentials) => {
    const result = await signIn(values);
    setUser(result.userResponse);
    router.push("/(tabs)");
  };

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingTop: 20, justifyContent: "center" }}
    >
      <SafeAreaView>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={require("@/assets/icons/flowbite-logo.png")}
            style={{ width: 50, height: 50 }}
          />
        </View>

        <Text style={[styles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>
          Welcome Back!
        </Text>
        <Text style={styles.learningText}>
          Login to your existing account of Eduwise
        </Text>
        <View style={styles.inputContainer}>
          <View>
            <View style={{ marginTop: 15 }}>
              <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="support@eduwise.com"
                    keyboardType="email-address"
                    leftIcon={Fontisto}
                    nameLeftIcon="email"
                    onChangeText={onChange}
                    value={value}
                    error={errors.email?.message}
                  />
                )}
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    keyboardType="default"
                    placeholder="••••••••"
                    type="password"
                    leftIcon={SimpleLineIcons}
                    nameLeftIcon="lock"
                    onChangeText={onChange}
                    value={value}
                    error={errors.password?.message}
                  />
                )}
              />
            </View>
            <TouchableOpacity
              onPress={() => router.push("/(routes)/forgot-password")}
            >
              <Text
                style={[
                  styles.forgotSection,
                  { fontFamily: "Nunito_600SemiBold" },
                ]}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <Button
              loading={isPending}
              onPress={handleSubmit(onSubmit)}
              title="Sign In"
            />

            <View style={styles.relative}>
              <View style={styles.relativeText}>
                <Text style={{ backgroundColor: "transparent" }}>
                  Or continue with
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.loginWithGoogle}
              onPress={() => {
                Toast.show("Sign in success", {
                  type: "danger",
                });
              }}
            >
              <Image
                source={require("@/assets/icons/google.png")}
                style={styles.logo}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: "Raleway_700Bold",
                }}
              >
                Login with google
              </Text>
            </TouchableOpacity>
            <View style={styles.signupRedirect}>
              <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(routes)/sign-up")}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Raleway_600SemiBold",
                    color: "#2467EC",
                    marginLeft: 5,
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
