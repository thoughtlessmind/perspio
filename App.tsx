import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { useEffect, useMemo, useState } from "react";
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
  const discovery = useAutoDiscovery(
    "URL_TO_YOUR_IDENTITY_PROVIDER"
  );
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const redirectUri = makeRedirectUri({
    scheme: "myapp",
    path: "myapp://auth",
  });
  const clientId = "CLIENT_ID";

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ["openid", "profile", "email", "offline_access"],
      redirectUri,
      usePKCE: true,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success" && discovery) {
      const { code } = response.params;

      exchangeCodeAsync(
        {
          clientId,
          code,
          redirectUri,
          extraParams: {
            code_verifier: request?.codeVerifier || "",
          },
        },
        discovery
      )
        .then((res) => {
          setToken(res.accessToken);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token exchange error:", err);
        });
    }
  }, [response, discovery]);

  const LoginComponent = () =>
    useMemo(() => <Login onLogin={promptAsync} />, [promptAsync]);

  return (
    <NavigationContainer>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Stack.Navigator>
          {loggedIn ? (
            <Stack.Screen name="Home" component={Home} />
          ) : (
            <Stack.Screen name="Login" component={LoginComponent} />
          )}
        </Stack.Navigator>
      </ApplicationProvider>
    </NavigationContainer>
  );
}
