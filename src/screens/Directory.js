import React, { useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import { ListItem, Avatar, Input } from "react-native-elements";
import { RefreshControl } from "react-native";
import { getUrl } from "../constants/Constants";

const EMPLOYEES_INFORMATION = gql`
  query GetEmployees {
    employees {
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

export default ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(EMPLOYEES_INFORMATION);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  if (error) {
    return <Text>{error.message}</Text>;
  }
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => refetch()} />
        }
      >
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
                source={avatar ? { uri: getUrl(avatar.url) } : null}
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
    </>
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
