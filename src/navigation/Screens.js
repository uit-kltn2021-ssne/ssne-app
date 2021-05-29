import React from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import ChatbotView from "../screens/ChatbotView";
import Directory from "../screens/Directory";
import EmployeeInformation from "../screens/EmployeeInformation";
import ArticleDetails from "../screens/ArticleDetails";

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTransparent: true,
          headerShown: false,
          headerTintColor: "white",
        }}
      />
      <Stack.Screen name="Chatbot" component={ChatbotView} />
      <Stack.Screen
        name="Directory"
        component={Directory}
        options={{
          title: "Đồng nghiệp",
          headerStyle: {
            elevation: 0,
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="EmployeeInformation"
        component={EmployeeInformation}
        options={{
          title: null,
          headerTransparent: true,
          headerStyle: {
            elevation: 0,
          },
        }}
      />
      <Stack.Screen name="ArticleDetails" component={ArticleDetails} />
    </Stack.Navigator>
  );
}
