import React, { useRef, useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { gql, useMutation } from "@apollo/client";
import { Text } from 'react-native';
import { JwtContext } from '../store';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
        jwt
    }
  }
`;

export default ({ navigation }) => {

    const [jwt, setJwt] = useContext(JwtContext);

    const [email, setEmail] = useState("test.user@ssne.xyz");
    const [password, setPassword] = useState("testuser");

    const emailRef = useRef();
    const passwordRef = useRef();

    const [loginRequest, { loading }] = useMutation(LOGIN_MUTATION, {
        context: {
            headers: {
                authorization: ""
            }
        },
        onCompleted: async (data) => {
            if (data && data.login && data.login.jwt) {
                setJwt(data.login.jwt);
                await AsyncStorage.setItem("token", data.login.jwt);
                console.log(200)
                navigation.navigate("TabNavigator");
            }
        },
        onError: async (error) => {
            setJwt(undefined);
            await AsyncStorage.removeItem("token");
            passwordRef.current.clear();
            setPassword("");
            alert(error);
        }
    });

    return (
        <View style={styles.container}>
            <Input
                placeholder='User Name'
                ref={emailRef}
                defaultValue={email}
                onChangeText={(text) => {
                    setEmail(text)
                    if (!text) {
                        emailRef.current.setNativeProps({ errorMessage: "Require email", renderErrorMessage: true })
                    }
                }}
            />
            <Input
                renderErrorMessage
                placeholder='Password'
                ref={passwordRef}
                defaultValue={password}
                secureTextEntry={true}
                onChangeText={(text) => {
                    setPassword(text)
                    if (!text) {
                        passwordRef.current.setNativeProps({ errorMessage: "Require password", renderErrorMessage: true })
                    }
                }}
            />
            <Button disabled={loading} title="Login" onPress={(e) => {
                if (email && password) {
                    console.log(email);
                    console.log(password);
                    loginRequest({ variables: { identifier: email, password: password } });
                } else {
                    if (!email) {
                        emailRef.current.setNativeProps({ errorMessage: "Require email", renderErrorMessage: true });
                    }
                    if (!password) {
                        passwordRef.current.setNativeProps({ errorMessage: "Require password", renderErrorMessage: true })
                    }
                }

            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});