import * as React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { MaterialIcons as Mi } from "@expo/vector-icons";
import ArticleList from "../screens/ArticleList";
import { createStackNavigator } from "@react-navigation/stack";
import EmployeeInformation from "../screens/EmployeeInformation";
import ArticleDetails from "../screens/ArticleDetails";
import ChatbotView from "../screens/ChatbotView";
import FirstScreen from "../screens/FirstScreen";
import Login from "../screens/Login";
import UserDetail from "../screens/UserDetail";
import SearchArticle from "../screens/SearchArticle";
import { Button, SearchBar } from "react-native-elements";
import SearchEmployee from "../screens/SearchEmployee";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { User3Context } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const DirectoryStack = createStackNavigator();
const ArticleStack = createStackNavigator();
const ChatbotStack = createStackNavigator();
const UserInfoStack = createStackNavigator();

export default ({ authenticated }) => {
  return (
    <GlobalStack.Navigator
      initialRouteName={authenticated ? "TabNavigator" : "FirstScreen"}
    >
      <GlobalStack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={{
          headerShown: false,
        }}
      />
      <GlobalStack.Screen
        name="Login"
        component={Login}
        options={{ title: "Đăng nhập" }}
      />
      {authenticated && (
        <GlobalStack.Screen
          name="TabNavigator"
          options={{
            headerShown: false,
          }}
          component={tabComponent}
        />
      )}
    </GlobalStack.Navigator>
  );
};

function tabComponent() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Articles":
              iconName = "book";
              break;
            case "Directory":
              iconName = "person-search";
              break;
            case "Chatbot":
              iconName = "chat";
              break;
            case "UserInfo":
              iconName = "person";
              break;
          }

          return <Mi name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTransparent: true,
          headerShown: false,
          headerTintColor: "white",
          title: "Trang chủ",
        }}
      />
      <Tab.Screen
        name="Articles"
        component={articleStackComponent}
        options={{
          title: "Sổ tay",
        }}
      />
      <Tab.Screen
        name="Directory"
        component={directoryStackComponent}
        options={{
          title: "Đồng nghiệp",
        }}
      />
      <Tab.Screen name="Chatbot" component={chatbotStackComponent} />
      <Tab.Screen
        name="UserInfo"
        component={userInfoStackComponent}
        options={{
          title: "Hồ sơ",
        }}
      />
    </Tab.Navigator>
  );
}

function articleStackComponent() {
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const searchBarRef = React.useRef();

  function renderSearchView({ navigation }) {
    return <SearchArticle keyword={searchKeyword} navigation={navigation} />;
  }

  return (
    <ArticleStack.Navigator>
      <ArticleStack.Screen
        name="Articles"
        component={ArticleList}
        options={({ navigation }) => ({
          headerStyle: {
            elevation: 0,
          },
          title: "Sổ tay",
          headerRight: () => (
            <Button
              buttonStyle={{ borderColor: "white", marginRight: 10 }}
              type="clear"
              onPress={() => {
                setSearchKeyword("");
                searchBarRef.current?.focus();
                navigation.navigate("SearchArticle");
              }}
              icon={() => <Mi name="search" size={24} />}
            />
          ),
        })}
      />
      <ArticleStack.Screen
        name="ArticleDetails"
        component={ArticleDetails}
        options={{
          title: null,
        }}
      />
      <ArticleStack.Screen
        name="SearchArticle"
        component={renderSearchView}
        options={{
          header: (props) => (
            <SearchBar
              ref={searchBarRef}
              autoFocus
              containerStyle={{ paddingTop: props.insets.top }}
              {...props}
              platform="android"
              placeholder="Nhập nội dung cần tìm..."
              onChangeText={setSearchKeyword}
              value={searchKeyword}
            />
          ),
        }}
      />
    </ArticleStack.Navigator>
  );
}

function directoryStackComponent() {
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const searchBarRef = React.useRef();

  function renderSearchView({ navigation }) {
    return <SearchEmployee keyword={searchKeyword} navigation={navigation} />;
  }

  return (
    <DirectoryStack.Navigator>
      {/* <DirectoryStack.Screen
        name="Directory"
        component={Directory}
        options={({ navigation }) => ({
          headerStyle: {
            elevation: 0,
          },
          headerRight: () => (
            <Button
              buttonStyle={{ borderColor: "white", marginRight: 10 }}
              type="clear"
              onPress={() => {
                setSearchKeyword("");
                //searchBarRef.current?.focus();
                navigation.navigate("SearchEmployee");
              }}
              icon={() => <Mi name="search" size={24} />}
            />
          ),
        })}
      /> */}
      <ArticleStack.Screen
        name="SearchEmployee"
        component={renderSearchView}
        options={{
          header: (props) => (
            <SearchBar
              ref={searchBarRef}
              autoFocus
              containerStyle={{ paddingTop: props.insets.top }}
              {...props}
              platform="android"
              placeholder="Tìm kiếm đồng ngiệp..."
              onChangeText={setSearchKeyword}
              value={searchKeyword}
            />
          ),
        }}
      />
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
    </DirectoryStack.Navigator>
  );
}

function chatbotStackComponent() {
  return (
    <ChatbotStack.Navigator>
      <ChatbotStack.Screen
        name="Chatbot"
        component={ChatbotView}
        options={{
          headerStyle: {
            elevation: 0,
            borderBottomColor: "#ddd",
            borderBottomWidth: 0.5,
          },
        }}
      />
    </ChatbotStack.Navigator>
  );
}

function userInfoStackComponent() {
  const [user, setUser] = React.useContext(User3Context);
  return (
    <UserInfoStack.Navigator>
      <UserInfoStack.Screen
        name="UserInfoScreen"
        component={UserDetail}
        options={({ navigation }) => ({
          title: null,
          headerTransparent: true,
          headerStyle: {
            elevation: 0,
          },
          headerRight: () => (
            <Menu>
              <MenuTrigger
                customStyles={{
                  triggerWrapper: {
                    margin: 10,
                    padding: 5,
                  },
                }}
              >
                <Mi name="more-vert" size={24} />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionWrapper: { padding: 15 },
                  optionText: {
                    fontSize: 16,
                  },
                }}
              >
                <MenuOption
                  onSelect={async () => {
                    setUser(undefined);
                    await AsyncStorage.removeItem("user");
                    // navigation.reset({
                    //   index: 0,
                    //   routes: [{ name: "FirstScreen" }],
                    // });
                  }}
                  text="Đăng xuất"
                />
              </MenuOptions>
            </Menu>
          ),
        })}
      />
    </UserInfoStack.Navigator>
  );
}
