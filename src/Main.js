import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "react-native-elements";
import Screens from "./navigation/Screens";
// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
import { ArticleContext, ChatbotContext, User3Context } from "./store";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  gql,
  useQuery,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Tabs from "./navigation/Tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuProvider } from "react-native-popup-menu";

enableScreens();

const Main = () => {
  const chatbotState = useState([]);
  const userState = useState({
    jwt: null,
    user: {},
  });
  const articleState = useState({
    selectedArticleCategory: "",
  });

  const [userValue, setUserValue] = userState;

  const readJwtFromStorage = async () => {
    const _user = await AsyncStorage.getItem("user");
    console.log(JSON.parse(_user));
    setUserValue(JSON.parse(_user));
  };

  // get the authentication token from local storage if it exists
  useEffect(() => {
    readJwtFromStorage();
  }, []);

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        authorization:
          userValue && userValue.jwt ? `Bearer ${userValue.jwt}` : "",
        ...headers,
      },
    };
  });

  const navigationRef = useRef(null);

  const httpLink = createHttpLink({
    uri: "https://api.ssne.xyz/graphql",
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          // Apollo Server sets code to UNAUTHENTICATED
          // when an AuthenticationError is thrown in a resolver
          case "INTERNAL_SERVER_ERROR":
            //navigationRef.current?.reset();
            navigationRef.current?.reset({
              index: 0,
              routes: [{ name: "FirstScreen" }],
            });
            break;
          default:
            console.log(
              `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`
            );
        }
      }
      if (networkError)
        console.log(`[Network error]: ${networkError.statusCode}`);
    }
  });

  const apolloClient = new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });

  //const { loading, error, data } = useQuery(GET_MY_INFORMATION, { client: apolloClient});
  return (
    <ApolloProvider client={apolloClient}>
      <User3Context.Provider value={userState}>
        <ArticleContext.Provider value={articleState}>
          <ChatbotContext.Provider value={chatbotState}>
            <MenuProvider>
              <NavigationContainer ref={navigationRef}>
                <ThemeProvider>
                  <Tabs authenticated={!!userValue} />
                </ThemeProvider>
              </NavigationContainer>
            </MenuProvider>
          </ChatbotContext.Provider>
        </ArticleContext.Provider>
      </User3Context.Provider>
    </ApolloProvider>
  );
};

export default Main;
