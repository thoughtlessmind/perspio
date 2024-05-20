import {
  ApplicationProvider,
  Button,
  IconRegistry,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { useState } from "react";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/components/Login";
import Home from "./src/components/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  const discovery = useAutoDiscovery("MS_LOGIN_URL");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const redirectUri = makeRedirectUri({
    scheme: undefined,
    path: "auth",
  });
  const clientId = "CLIENT_ID";

  // We store the JWT in here

  // Request
  const [request, , promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ["openid", "profile", "email", "offline_access"],
      redirectUri,
    },
    discovery
  );

  const onLoginPress = () => {
    console.log("Login pressed");
    console.log(Linking.makeUrl());
    promptAsync().then((codeResponse) => {
      if (request && codeResponse?.type === "success" && discovery) {
        exchangeCodeAsync(
          {
            clientId,
            code: codeResponse.params.code,
            extraParams: request.codeVerifier
              ? { code_verifier: request.codeVerifier }
              : undefined,
            redirectUri,
          },
          discovery
        ).then((res) => {
          console.log("Token", res.accessToken);
          setToken(res.accessToken);
        });
      }
    });
  };

  return (
    <NavigationContainer>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Stack.Navigator>
          {loggedIn ? (
            <Stack.Screen name="Home" component={Home} />
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
        <Button onPress={() => onLoginPress()}>Logged in toggle</Button>
      </ApplicationProvider>
    </NavigationContainer>
  );
}
