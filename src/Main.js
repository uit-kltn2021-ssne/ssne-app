import React, { useState } from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "react-native-elements";
import Screens from "./navigation/Screens";
// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
import { ChatbotContext } from "./store";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Tabs from "./navigation/Tabs";

enableScreens();

const apolloClient = new ApolloClient({
  uri: "https://api.ssne.xyz/graphql",
  cache: new InMemoryCache(),
});

const Main = () => {
  const chatbotState = useState([]);

  return (
    <ApolloProvider client={apolloClient}>
      <ChatbotContext.Provider value={chatbotState}>
        <NavigationContainer>
          <ThemeProvider>
            <Tabs />
          </ThemeProvider>
        </NavigationContainer>
      </ChatbotContext.Provider>
    </ApolloProvider>
  );
};

export default Main;
