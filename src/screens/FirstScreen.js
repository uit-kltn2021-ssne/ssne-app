import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

export default ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button title="Login" onPress={(e) => onPress(navigation, e)} />
        </View>
    );
}

const onPress = (navigation, event) => {
    navigation.push("Login");
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});