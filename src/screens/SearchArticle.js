import { ListItem, SearchBar } from "react-native-elements";
import React, { useState } from "react";
import { SafeAreaView } from "react-navigation";
import { useQuery, gql } from "@apollo/client";
import { View, ActivityIndicator, Text, ScrollView } from "react-native";

const GET_ARTICLE_QUERY = gql`
  query GetArticles($search: String!) {
    articles(where: { title_contains: $search }) {
      id
      title
    }
  }
`;

export default ({ navigation, keyword }) => {
  //console.log(keyword);
  if (!keyword) {
    return <View></View>;
  }

  const { loading, error, data } = useQuery(GET_ARTICLE_QUERY, {
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
      {data.articles.map(({ id, title }) => (
        <ListItem
          bottomDivider
          onPress={() =>
            navigation.push("ArticleDetails", {
              itemId: id,
            })
          }
          key={id}
          //onPress={() => onItemPress(id)}
          style={{
            overflow: "hidden",
          }}
          //containerStyle={{ backgroundColor: "#fff" }}
        >
          <ListItem.Content>
            <ListItem.Title>{title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </ScrollView>
  );
};
