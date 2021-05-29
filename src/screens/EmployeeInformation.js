import React, { useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import { ListItem, Avatar, Input, Button, Card } from "react-native-elements";
import { getUrl } from "../constants/Constants";
import { FontAwesome as Fa } from "@expo/vector-icons";

const EMPLOYEE_INFORMATION = gql`
  query GetEmployee($uid: ID!) {
    employee(id: $uid) {
      id
      name
      email
      avatar {
        url
      }
    }
  }
`;

export default ({ route, navigation }) => {
  const { itemId } = route.params;
  const { loading, error, data } = useQuery(EMPLOYEE_INFORMATION, {
    variables: { uid: itemId },
  });

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  if (error) return <Text>{error}</Text>;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarSection}>
        <Avatar
          avatarStyle={{
            borderRadius: 80,
            borderColor: "#ddd",
            borderWidth: 1,
          }}
          containerStyle={{ width: 160, height: 160 }}
          source={{ uri: getUrl(data.employee.avatar.url) }}
        />
      </View>
      <View style={styles.nameSection}>
        <Text style={styles.nameStyle}>{data.employee.name}</Text>
      </View>
      <View style={styles.buttonSection}>
        <Button title={<Fa name="phone" style={styles.icon} />} />
        <Button title={<Fa name="comments" style={styles.icon} />} />
        <Button title={<Fa name="skype" style={styles.icon} />} />
      </View>
      <View style={styles.infoSection}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#666" }}>
          Thông Tin Cơ Bản
        </Text>
        <Card
          containerStyle={{
            borderRadius: 10,
            padding: 0,
            marginHorizontal: 0,
            overflow: "hidden",
          }}
          wrapperStyle={{ borderRadius: 10 }}
        >
          <ListItem style={styles.infoItem}>
            <ListItem.Content
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ListItem.Title style={{ fontWeight: "bold" }}>
                Phòng ban
              </ListItem.Title>
              <ListItem.Title>PhongIT</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem style={styles.infoItem}>
            <ListItem.Content>
              <ListItem.Title>Hello</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem style={styles.infoItem}>
            <ListItem.Content>
              <ListItem.Title>Hello</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem style={styles.infoItem}>
            <ListItem.Content>
              <ListItem.Title>Hello</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  avatarSection: { alignSelf: "center", padding: 30, paddingTop: 50 },
  nameSection: {
    padding: 10,
    alignItems: "center",
  },
  nameStyle: { fontSize: 25, fontWeight: "bold" },
  buttonSection: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  icon: {
    color: "#fff",
    fontSize: 20,
    paddingHorizontal: 2,
    marginHorizontal: 10,
  },
  infoSection: {
    padding: 20,
  },
  infoItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
