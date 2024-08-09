import { Redirect } from "expo-router";
import Loader from "@/components/loader/loader";
import React from "react";
import { useAuth } from "@/hooks/useAuth";

export default function TabsIndex() {
  const { loading, user } = useAuth();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Redirect href={!user ? "/(routes)/onboarding" : "/(tabs)"} />
      )}
    </>
  );
}
