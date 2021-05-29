import React from 'react';
import { View } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { ListItem } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

const GET_ARTICLE_QUERY = gql`
  query GetArticles {
    articles {
      id
      title
    }
  }
`;


export default ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_ARTICLE_QUERY);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) return <Text>{error}</Text>;

  return <View style={{ margin: 10 }}>
    {
      data.articles.map(({ id, title }) => (
        <ListItem
          onPress={() =>
            navigation.push("ArticleDetails", {
              itemId: id,
            })
          }
          key={id}
          //onPress={() => onItemPress(id)}
          style={{
            borderColor: "#eee",
            borderWidth: 1,
            marginBottom: 10,
            overflow: "hidden",
          }}
          containerStyle={{ backgroundColor: "#fff" }}
        >
          <ListItem.Content>
            <ListItem.Title>{title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))
    }
  </View>
};
