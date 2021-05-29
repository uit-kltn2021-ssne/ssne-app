import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { FontAwesome as Fa } from "@expo/vector-icons";

export default ({ placeholder, style }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <TextInput placeholder={placeholder} style={styles.textInput} />
      <Fa name="search" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 10,
  },
  textInput: {
    flex: 1
  },
  icon: {
    alignContent: "center",
    alignSelf: "center",
    fontSize: 18,
    color: "#888888",
  },
});
