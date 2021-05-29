import { Dialogflow_V2 } from "react-native-dialogflow";
import { View, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
import locale from "dayjs/locale/vi";
import { ChatbotContext } from "../store";

export default ChatbotView = () => {
  const privateKey = `-----BEGIN PRIVATE KEY-----
    MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDh3WJXcmtiWN1p
    rlpSv/C2Si1vg8iEwqQgy+6g9FblvyWE0qDRJV4wAzAvW3s47BSE6dYB9iFIcXNh
    JMwzTXZnceyh3NTlBspZQaXL7uy5sWiGrEeyIrscLj+b8codGbJQTG5XiVNUcFSE
    Kp9lPSL3PiocZ4WvyQPGykwlHWJQMDShdwMdJPxRtEM1Iu5HNJM4i63kDJFPtxLD
    utHlgsLFcqewZpE7gKDHg7jStjrrSAYVEFND3fDaR9T4uccAB5AmFlPNyqpdyfg5
    XNTm05hKOvYh4jmCmrtoMKQvFU2fij4YB4CUYRSCEIadmZguF2kl1gWlZR32pFDi
    qSOHjbPDAgMBAAECggEBALIK/nNqaYXMATVGUEL8tLYtgOVv34fvmsuTlhbgpQNU
    CzJJiqVzLGzyhnA+T8MOLhqb7av8Jj5h2A7Sn/ks7dIbduodFuE22hlD63r3aznx
    xDCs65NbV12eg1vdXHJWCD7OEQkF4l8kcSsCIkX+zGpTYYSkgjiQX167pwx2vkHw
    UkfqCatDGTazllPmrlN5BRwp4JQup53CexGFenavSypy2HHYMkFvr7Ljd2Jq5FWT
    7Q4szV+kqg127lib4966qyNK6AUtVbPfLJ99x26qIGDyEiHsNm0K5GQuPGQ8fjUa
    djB3hr7IB6ojSuL1adS+HrSezO2EujWzKd4nFecr20ECgYEA/mjtOMz7kIieeYL3
    Jjrqee7z1ndffPEu8Unq6jEREvBMxqbwdP28DrAF62WjqMngkBrxtJfQU1Y3peiS
    v2VYMXBIaO16y9qD3ZzSwhpBS8taW4gCZV8Avm+P9BKR7HYY1ye/rEPmWLs3ka1G
    ocuYY3AzNaHvgdTCOiDZI4nWjiECgYEA40bIjByXoFppn3V2bFkPvIHG/kT7eYbB
    Ddj4+vczAcfyX5L9aBha4bEyVy0lkOd4L+R+ugscsi8jUUhEGwLrOMMVpmmI4GKI
    xClavXDBYTLnd3t4qnF2v5BRmOIW/kOtrEeUudYT4Jv5RpKOjUzWIXiJ39Wfs8b+
    oQuc/S4bHWMCgYAEQynGS9jjIQbWrlUJtO78v/4h17on07qfnEdtSQkqMhB3O5DH
    xQCDlnti6D8HsuoqP+lQx0JcQxOHmg/rWP1TRrhP2bq286BF9Dyrt9jkNjH7Wpn/
    rMnMZv4Ybr83IPtlj2rsre6MCgbyT97hExIoiFazTVU/7ZqbcrVwnPyVQQKBgQDM
    jSBiOjmdcMIvaiCzU1T+bC8VGjDbJ5UJSYaNGX8m0zYpHrpDvefNyRVtsIxm5m0d
    baFBAE9Lb3Fx7oCdbvsVkz8hD0rJ6OT+59lrNthVCuOYfeAURxqBPvqxhor7PR5K
    OAJ7X1l0hezMv4rdUZJHfZ1Zf4LE4wy5FSKuG5j70QKBgBUaaifTEdgqsbqgmpTT
    YlsptnyCNZKyHTyNBRk1AGszRFS98VxhAuJR+I1C5UrFTUjF2aw4XrId40zcONTu
    qcn7fc/Q19zVs43WZo44ghwQ2rLGq29EHP2/iPJLWwSxilfVTlUQ6W7D3ggRof0a
    HYnG2OQ3mTkEDsvp3U7UG/ha
    -----END PRIVATE KEY-----`;

  const serviceAccount =
    "ssne-363@employee-support-system.iam.gserviceaccount.com";
  const language = Dialogflow_V2.LANG_ENGLISH;
  const projectId = "employee-support-system";

  const [messages, setMessages] = useContext(ChatbotContext);

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      serviceAccount,
      privateKey,
      language,
      projectId
    );
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
