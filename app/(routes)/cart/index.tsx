import CartScreen from "@/screens/cart";
import { StripeProvider } from "@stripe/stripe-react-native";
import React from "react";

export default function index() {
  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
    >
      <CartScreen />
    </StripeProvider>
  );
}
