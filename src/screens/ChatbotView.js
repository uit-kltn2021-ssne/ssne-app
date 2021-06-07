import { Dialogflow_V2 } from "react-native-dialogflow";
import { View, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
import locale from "dayjs/locale/vi";
import { ChatbotContext } from "../store";
import { ActivityIndicator } from "react-native";

export default ChatbotView = () => {
  const privateKey = process.env.GOOGLE_CLOUD_PRIVATE_KEY;

  const serviceAccount =
    "ssne-363@employee-support-system.iam.gserviceaccount.com";
  const language = Dialogflow_V2.LANG_ENGLISH;
  const projectId = "employee-support-system";

  const [messages, setMessages] = useContext(ChatbotContext);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log(privateKey);
    Dialogflow_V2.setConfiguration(
      serviceAccount,
      privateKey,
      language,
      projectId
    );
    setLoading(false);
  }, []);

  const BOT_USER = {
    _id: 2,
    name: "New employee chatbot",
  };

  const onSend = (_messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, _messages)
    );
    let message = _messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      (result) => handleResponse(result),
      (error) => console.log(error)
    );
  };

  const handleResponse = (result) => {
    console.log(result);
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    let payload = result.queryResult.webhookPayload;
    showResponse(text, payload);
  };

  const showResponse = (text, payload) => {
    let msg = {
      _id: messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER,
    };
    if (payload && payload.is_url) {
      msg.text = "image";
      msg.image = text;
    }
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [msg])
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(_messages) => onSend(_messages)}
        locale={locale.name}
        user={{
          _id: 1,
        }}
        alwaysShowSend={true}
        placeholder="Nhập tin nhắn..."
        renderSend={(props) => <Send {...props} label="Gửi" />}
      />
    </View>
  );
};
