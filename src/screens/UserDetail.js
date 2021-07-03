import React, { useState, useMemo, useCallback, useContext } from "react";
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
import { User3Context } from "../store";

const EMPLOYEE_INFORMATION = gql`
  query GetEmployee($uid: ID!) {
    employees(where: { user: { id_eq: $uid } }) {
      id
      name
      email
      phoneNumber
      skypeId
      employeeId
      facebook
      introduction
      position
      avatar {
        url
      }
      user {
        id
      }
      department {
        name
      }
    }
  }
`;

export default ({ navigation }) => {
  const [userState, setUser] = useContext(User3Context);

  if (!userState) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  const { id, username } = userState.user;
  const { loading, error, data } = useQuery(EMPLOYEE_INFORMATION, {
    variables: {
      uid: id,
    },
  });

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  if (error) return <Text>{error}</Text>;

  const {
    name,
    email,
    avatar,
    skypeId,
    employeeId,
    facebook,
    introduction,
    department,
    position,
    phoneNumber,
  } = data.employees[0];
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
          source={{ uri: getUrl(avatar.url) }}
        />
      </View>
      <View style={styles.nameSection}>
        <Text style={styles.nameStyle}>{name}</Text>
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
                Mã số
              </ListItem.Title>
              <ListItem.Title>{employeeId}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
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
              <ListItem.Title>{department.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem style={styles.infoItem}>
            <ListItem.Content
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ListItem.Title style={{ fontWeight: "bold" }}>
                Vị trí
              </ListItem.Title>
              <ListItem.Title>{position}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem style={styles.infoItem}>
            <ListItem.Content
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ListItem.Title style={{ fontWeight: "bold" }}>
                Số điện thoại
              </ListItem.Title>
              <ListItem.Title>{phoneNumber}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem style={styles.infoItem}>
            <ListItem.Content
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ListItem.Title style={{ fontWeight: "bold" }}>
                Email
              </ListItem.Title>
              <ListItem.Title>{email}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem style={styles.infoItem}>
            <ListItem.Content
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ListItem.Title style={{ fontWeight: "bold" }}>
                Skype
              </ListItem.Title>
              <ListItem.Title>{skypeId}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem style={styles.infoItem}>
            <ListItem.Content
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ListItem.Title style={{ fontWeight: "bold" }}>
                Facebook
              </ListItem.Title>
              <ListItem.Title>{facebook}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </Card>
      </View>
      <View style={styles.infoSection}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#666" }}>
          Giới thiệu
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
            <ListItem.Content>
              <ListItem.Title>{introduction}</ListItem.Title>
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
