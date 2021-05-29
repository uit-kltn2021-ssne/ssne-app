import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Markdown from "react-native-markdown-display";
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button } from "react-native";

const GET_ARTICLE_QUERY = gql`
  query GetArticle($uid: ID!) {
    article(id: $uid) {
      id    
      title
      content
    }
  }
`;

export default ({ route, navigation }) => {

  const [textFontSize, setTextFontSize] = useState(16);

  const { itemId } = route.params;
  const { loading, error, data } = useQuery(GET_ARTICLE_QUERY, {
    variables: { uid: itemId },
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>"errror..."</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    body: {
      fontSize: textFontSize,
      padding: 10,
      marginBottom: 30,
    }
  })

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white", zIndex: 9 }}
        contentContainerStyle={{ position: "absolute", top: 0 }}
      >
        <Markdown style={styles}>{data.article.content}</Markdown>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 10, zIndex: 10, alignSelf: "center", flexDirection: "row" }}>
        <Button title="+" onPress={() => setTextFontSize(textFontSize + 2)} />
        <Button title="-" onPress={() => setTextFontSize(textFontSize - 2)} />
      </View>

    </View>


  );
};
