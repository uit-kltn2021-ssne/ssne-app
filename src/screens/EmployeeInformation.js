import React, { useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import { ListItem, Avatar, Input, Button, Card } from "react-native-elements";
import { getUrl } from "../constants/Constants";
import { FontAwesome as Fa } from "@expo/vector-icons";
import call from 'react-native-phone-call';

const EMPLOYEE_INFORMATION = gql`
  query GetEmployee($uid: ID!) {
    employee(id: $uid) {
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
  } = data.employee;

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
          source={data.employee.avatar ? { uri: getUrl(data.employee.avatar.url) } : null}
        />
      </View>
      <View style={styles.nameSection}>
        <Text style={styles.nameStyle}>{data.employee.name}</Text>
      </View>
      <View style={styles.buttonSection}>
        <Button title={<Fa name="phone" style={styles.icon} />} onPress={() => {
          call({
            number: phoneNumber,
            prompt: true,
          })
        }} />
        <Button title={<Fa name="comments" style={styles.icon} />} onPress={async () => {
          const url = "sms:" + phoneNumber;
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            await Linking.openURL(url)
          }
        }} />
        <Button title={<Fa name="skype" style={styles.icon} />} onPress={async () => {
          const url = "skype:" + skypeId;
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            await Linking.openURL(url)
          }
        }} />
      </View>
      <View style={styles.infoSection}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#666" }}>
          Th??ng Tin C?? B???n
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
                M?? s???
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
                Ph??ng ban
              </ListItem.Title>
              <ListItem.Title>{department?.name}</ListItem.Title>
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
                V??? tr??
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
                S??? ??i???n tho???i
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
          Gi???i thi???u
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
