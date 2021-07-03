import { ListItem, Avatar } from "react-native-elements";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { getUrl } from "../constants/Constants";
import Directory from "./Directory";

const SEARCH_EMPLOYEE_QUERY = gql`
  query GetEmployees($search: String!) {
    employees(where: { name_contains: $search }) {
      id
      name
      email
      employeeId
      department {
        name
      }
      avatar {
        url
      }
    }
  }
`;

export default ({ navigation, keyword }) => {
  //console.log(keyword);
  if (!keyword) {
    return <Directory navigation={navigation} />;
  }

  const { loading, error, data } = useQuery(SEARCH_EMPLOYEE_QUERY, {
    variables: {
      search: keyword,
    },
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) return <Text>{error.message}</Text>;

  return (
    <ScrollView style={{ marginTop: 1 }}>
      {data.employees.map(
        ({ id, name, email, avatar, department, employeeId }) => (
          <ListItem
            key={id}
            onPress={() =>
              navigation.push("EmployeeInformation", {
                itemId: id,
              })
            }
            style={{ borderColor: "#eeeeee", borderWidth: 1 }}
          >
            <Avatar
              avatarStyle={{
                borderRadius: 30,
                borderColor: "#ddd",
                borderWidth: 1,
              }}
              containerStyle={{ width: 60, height: 60 }}
              source={{ uri: getUrl(avatar.url) }}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.listItemTitle}>
                {name}
              </ListItem.Title>
              <ListItem.Subtitle>
                {employeeId + (department ? " • " + department?.name : "")}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  searchBar: {
    margin: 20,
  },
  listItemTitle: {
    fontWeight: "bold",
  },
  bottomSheet: {
    backgroundColor: "#ffffff",
  },
});
