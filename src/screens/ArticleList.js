import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useQuery, gql } from "@apollo/client";
import { ListItem } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import { RefreshControl } from "react-native";

const GET_ARTICLE_CATEGORIES_QUERY = gql`
  query GetArticleCategories {
    articleCategories {
      id
      name
      articles {
        id
        title
      }
    }
  }
`;

export default ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(
    GET_ARTICLE_CATEGORIES_QUERY
  );
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) return <Text>{error}</Text>;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => refetch()} />
      }
      style={{ margin: 10 }}
    >
      {data.articleCategories?.map((item) => (
        <RenderCategory {...item} navigation={navigation} key={item.id} />
      ))}
    </ScrollView>
  );
};

const RenderCategory = ({ id, name, articles, navigation }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    articles.length > 0 && (
      <View style={{ marginBottom: 10 }}>
        <ListItem.Accordion
          bottomDivider
          key={id}
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "bold" }}>
                  {name}
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          {articles.map(({ id, title }) => (
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
        </ListItem.Accordion>
      </View>
    )
  );
};
