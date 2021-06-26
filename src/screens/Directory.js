import React, { useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import { ListItem, Avatar, Input } from "react-native-elements";
import SearchBar from "../components/SearchBar";
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
  return (
    <>
      <View style={styles.container}>
        {/* <SearchBar
          placeholder="Tìm kiếm đồng nghiệp..."
          style={styles.searchBar}
        /> */}
        <_Employees
          onItemPress={(id) =>
            navigation.push("EmployeeInformation", {
              itemId: id,
            })
          }
        />
      </View>
    </>
  );
};

const _Employees = ({ onItemPress }) => {
  const { loading, error, data } = useQuery(EMPLOYEES_INFORMATION);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  if (error) {
    console.log(error);
    return <Text>{error.message}</Text>;
  }

  return data.employees.map(
    ({ id, name, email, avatar, department, employeeId }) => (
      <ListItem
        key={id}
        onPress={() => onItemPress(id)}
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
          <ListItem.Title style={styles.listItemTitle}>{name}</ListItem.Title>
          <ListItem.Subtitle>
            {employeeId + (department ? " • " + department?.name : "")}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    )
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
