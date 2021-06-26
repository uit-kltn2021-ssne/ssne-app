import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import Student from "../components/Svg/Student";
import Pattern from "../components/Svg/Pattern";
import { useQuery, gql, useMutation } from "@apollo/client";
import { ListItem } from "react-native-elements";
import { RefreshControl } from "react-native";

const { height } = Dimensions.get("window");

export default ({ navigation }) => {
  const queryResult = useQuery(GET_CHECKLIST_QUERY);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={queryResult.loading}
          onRefresh={queryResult.refetch}
        />
      }
    >
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
        <CheckList navigation={navigation} queryResult={queryResult} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    flexGrow: 1,
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

const COMPLETE_CHECKLIST_ITEM_MUTATION = gql`
  mutation CompleteCheckListItemMutation($uid: ID!, $checked: Boolean) {
    updateChecklistItem(
      input: { where: { id: $uid }, data: { status: $checked } }
    ) {
      checklistItem {
        id
        title
        description
        status
        tag
      }
    }
  }
`;

const CheckList = ({ navigation, queryResult }) => {
  const [completeChecklistItem, {}] = useMutation(
    COMPLETE_CHECKLIST_ITEM_MUTATION
  );

  const { loading, data, error } = queryResult;

  if (loading) {
    return null;
  }

  if (error) return <Text>{error}</Text>;

  return data.checklistItems.map(({ id, title, status }) => (
    <ListItem
      onPress={() =>
        completeChecklistItem({ variables: { uid: id, checked: !status } })
      }
      key={id}
      style={{
        borderColor: "#eeeeee",
        borderWidth: 1,
        marginBottom: 20,
        overflow: "hidden",
      }}
      containerStyle={{ backgroundColor: "#FFF" }}
    >
      <ListItem.CheckBox
        checked={status}
        onPress={() =>
          completeChecklistItem({ variables: { uid: id, checked: !status } })
        }
      />
      <ListItem.Content>
        <ListItem.Title style={{ color: status ? "#888" : "#000" }}>
          {title}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ));
};
