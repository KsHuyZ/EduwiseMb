import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { router } from "expo-router";
import Input from "@/components/common/input";
import styles from "./styles";
import { TSignUpCredentials } from "@/types";
import { signUpSchema } from "@/validator";
import { useSignUp } from "./hooks";

export default function SignUpScreen() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TSignUpCredentials>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutateAsync: signUp, isPending } = useSignUp();

  const onSubmit = async (values: TSignUpCredentials) => {
    await signUp(values);
    setTimeout(() => Linking.openURL(`googlegmail://`), 1000);
  };

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                source={require("@/assets/icons/flowbite-logo.png")}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <Text style={styles.welcomeText}>Let's get started!</Text>
            <Text style={styles.learningText}>
              Create an account to Eduwise to get all features
            </Text>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="firstName"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="First Name"
                    placeholder="Huy"
                    onChangeText={onChange}
                    value={value}
                    error={errors.firstName?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Last Name"
                    placeholder="Phan"
                    onChangeText={onChange}
                    value={value}
                    error={errors.lastName?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    keyboardType="email-address"
                    placeholder="support@eduwise.com"
                    label="Email"
                    onChangeText={onChange}
                    value={value}
                    error={errors.email?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="••••••••"
                    label="Password"
                    type="password"
                    onChangeText={onChange}
                    value={value}
                    error={errors.password?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="passwordConfirm"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="••••••••"
                    label="Confirm Password"
                    type="password"
                    onChangeText={onChange}
                    value={value}
                    error={errors.passwordConfirm?.message}
                  />
                )}
              />
              <View>
                <TouchableOpacity
                  style={{
                    padding: 16,
                    borderRadius: 8,
                    backgroundColor: "#2467EC",
                    marginTop: 15,
                  }}
                  onPress={handleSubmit(onSubmit)}
                >
                  {isPending ? (
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
                      Sign Up
                    </Text>
                  )}
                </TouchableOpacity>

                <View style={styles.signupRedirect}>
                  <Text
                    style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}
                  >
                    Already have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.push("/(routes)/login")}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "Raleway_600SemiBold",
                        color: "#2467EC",
                        marginLeft: 5,
                      }}
                    >
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
