import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "react-native-elements";
import Screens from "./navigation/Screens";
// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
import { ChatbotContext, JwtContext } from "./store";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, gql, useQuery, from } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import Tabs from "./navigation/Tabs";
import AsyncStorage from '@react-native-async-storage/async-storage';

enableScreens();

const GET_MY_INFORMATION = gql`
  query GetMyInformation {
    me {
      username
      id
    }
  }
`;

const Main = () => {
  const chatbotState = useState([]);
  const jwtState = useState();
  const [jwt, setJwt] = jwtState;

  const readJwtFromStorage = async () => {
    const token = await AsyncStorage.getItem('token');
    setJwt(token);
  };

  // get the authentication token from local storage if it exists
  useEffect(() => {
    readJwtFromStorage();
  }, []);

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        authorization: jwt ? `Bearer ${jwt}` : "",
        ...headers,
      }
    }
  });

  const navigationRef = useRef(null);

  const httpLink = createHttpLink({
    uri: 'https://api.ssne.xyz/graphql',
  });
  
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          // Apollo Server sets code to UNAUTHENTICATED
          // when an AuthenticationError is thrown in a resolver
          case 'INTERNAL_SERVER_ERROR':
            navigationRef.current?.navigate('FirstScreen')
            break;
          default:
            console.log(
              `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`,
            )
        }
      }
    if (networkError) console.log(`[Network error]: ${networkError.statusCode}`);
  }});

  const apolloClient = new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache()
  });

  //const { loading, error, data } = useQuery(GET_MY_INFORMATION, { client: apolloClient});
  return (
    <ApolloProvider client={apolloClient}>
      <JwtContext.Provider value={jwtState}>
        <ChatbotContext.Provider value={chatbotState}>
          <NavigationContainer ref={navigationRef}>
            <ThemeProvider>
              <Tabs authenticated={true}/>
            </ThemeProvider>
          </NavigationContainer>
        </ChatbotContext.Provider>
      </JwtContext.Provider>
    </ApolloProvider>
  );
};

export default Main;
