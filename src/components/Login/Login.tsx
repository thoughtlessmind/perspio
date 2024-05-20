import React, { useState } from "react";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { SvgUri } from "react-native-svg";
import { View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState<string>("");

  const emailValidator = (email: string) => {
    const validEmailRegex = /^[a-zA-Z0-9._-]+@perspio\.dev$/;
    return !validEmailRegex.test(email);
  };

  return (
    <Layout style={{ paddingTop: 20 }}>
      <View>
        <SvgUri
          style={{ height: 40 }}
          uri="https://perspio.dev/assets/logos/perspio-mono-black.svg"
        />
      </View>
      <Layout level="4" style={{ padding: 16 }}>
        <Input onChangeText={setEmail} placeholder="" label="Username" />
        <Button
          style={{ marginTop: 16 }}
          onPress={() => console.log("email", email)}
          // disabled={emailValidator(email)}
        >
          Login
        </Button>
        <Text status="primary" style={{ marginTop: 8 }}>
          Forgot Password
        </Text>
      </Layout>
    </Layout>
  );
}
