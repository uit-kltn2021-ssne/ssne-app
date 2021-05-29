import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { MaterialIcons as Mi } from "@expo/vector-icons";
import ArticleList from '../screens/ArticleList';
import Directory from '../screens/Directory';
import { createStackNavigator } from "@react-navigation/stack";
import EmployeeInformation from '../screens/EmployeeInformation';
import ArticleDetails from '../screens/ArticleDetails';
import ChatbotView from '../screens/ChatbotView';

const Tab = createBottomTabNavigator();
const DirectoryStack = createStackNavigator();
const ArticleStack = createStackNavigator();
const ChatbotStack = createStackNavigator();

export default () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = "home"; break;
            case 'Articles':
              iconName = "book"; break;
            case 'Directory':
              iconName = "person-search"; break;
            case 'Chatbot':
              iconName = "chat"; break;
          }

          return <Mi name={iconName} size={size} color={color} />
        }

      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTransparent: true,
          headerShown: false,
          headerTintColor: "white",
        }} />
      <Tab.Screen
        name="Articles"
        component={articleStackComponent}
      />
      <Tab.Screen
        name="Directory"
        component={directoryStackComponent}
      />
      <Tab.Screen
        name="Chatbot"
        component={chatbotDirectoryStackComponent} />
    </Tab.Navigator>

  );
}

function articleStackComponent() {
  return (<ArticleStack.Navigator>
    <ArticleStack.Screen name="Articles" component={ArticleList} options={{
      headerStyle: {
        elevation: 0,
      }
    }} />
    <DirectoryStack.Screen name="ArticleDetails" component={ArticleDetails}
      options={{
        title: null
      }} />
  </ArticleStack.Navigator>);
}

function directoryStackComponent() {
  return (<DirectoryStack.Navigator>
    <DirectoryStack.Screen name="Directory" component={Directory} options={{
      headerStyle: {
        elevation: 0,
      }
    }} />
    <DirectoryStack.Screen
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
  </DirectoryStack.Navigator>);
}

function chatbotDirectoryStackComponent() {
  return (<ChatbotStack.Navigator>
    <ChatbotStack.Screen name="Chatbot" component={ChatbotView} options={{
      headerStyle: {
        elevation: 0,
        borderBottomColor: "#ddd",
        borderBottomWidth: 0.5
      }
    }} />
  </ChatbotStack.Navigator>);
}