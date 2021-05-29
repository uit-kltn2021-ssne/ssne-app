import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlightComponent,
  TouchableOpacity,
  Button,
} from "react-native";
import { Screen } from "react-native-screens";
import { Avatar } from "react-native-elements";
import { FlatList, Dimensions } from "react-native";
import { MaterialIcons as Mi } from "@expo/vector-icons";
import Student from "../components/Svg/Student";
import Pattern from "../components/Svg/Pattern";
import SearchBar from "../components/SearchBar";
import { useQuery, gql } from "@apollo/client";
import { ActivityIndicator } from "react-native";
import { ListItem } from "react-native-elements";

const { width, height } = Dimensions.get("window");

const _calcDimensions = (width, numColumns, margin) => {
  return (width - numColumns * margin) / numColumns;
};

export default ({ navigation }) => {
  const _size = _calcDimensions(width - 20 * 2, 3, 20);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          backgroundColor: "#F18C8E",
          height: height * 0.5,
          width: "100%",
          paddingTop: 80,
          paddingHorizontal: 20,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          <Pattern style={{ position: "absolute", top: -200, left: -100 }} />
          <View>
            <Text style={{ fontSize: 30, color: "white", fontWeight: "bold" }}>
              Chào mừng
            </Text>
            <Text style={{ fontSize: 30, color: "white", fontWeight: "bold" }}>
              Hiếu!
            </Text>
          </View>
        </View>
        <Student style={{ position: "absolute", top: 30, right: 0 }} />
      </View>

      {/* Article Section */}
      <View style={{ paddingHorizontal: 15, marginTop: -30 }}>
        <CheckList navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "#F9F9F9",
    flexGrow: 1
    //position: "relative",
  },
});

const GET_CHECKLIST_QUERY = gql`
  query GetChecklistItems {
    checklistItems {
      id
      title
      description
      status
      tag
    }
  }
`;

const CheckList = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_CHECKLIST_QUERY);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) return <Text>{error}</Text>;

  return data.checklistItems.map(({ id, title, status }) => (
    <ListItem
      // onPress={() =>
      //   navigation.push("ArticleDetails", {
      //     itemId: id,
      //   })
      // }
      key={id}
      style={{
        borderColor: "#eeeeee",
        borderWidth: 1,
        marginBottom: 20,
        overflow: "hidden",
      }}
      containerStyle={{ backgroundColor: "#FFF" }}
    >
      <ListItem.CheckBox checked={status} />
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>

    </ListItem>
  ));
};
