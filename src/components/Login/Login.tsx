import React, { useState } from "react";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { SvgUri } from "react-native-svg";
import { View } from "react-native";

type Props = {
  onLogin: () => void;
};

export default function Login(props: Props) {
  const { onLogin } = props;

  return (
    <Layout style={{ paddingTop: 20 }}>
      <View>
        <SvgUri
          style={{ height: 40 }}
          uri="https://perspio.dev/assets/logos/perspio-mono-black.svg"
        />
      </View>
      <Layout level="4" style={{ padding: 16 }}>
        <Button style={{ marginTop: 16 }} onPress={() => onLogin()}>
          Login
        </Button>
      </Layout>
    </Layout>
  );
}
