import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const {error} = useSelector(state => state.auth);

    const loginHandler = () => {
        dispatch(login(email, password));
    }

    useEffect(() => {
        if(error) {
            alert(error);
            dispatch({ type: 'clearError'});    
        }
    }, [error, dispatch, alert]);

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>Welcome</Text>
            <View style={{width: "70%"}}>
                <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
                <TextInput secureTextEntry placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} />
            </View>
            <Pressable style={styles.submitBtn} disabled={!email || !password} onPress={loginHandler} >
                <Text style={styles.btnText}>Login</Text>
            </Pressable>
            <Text style={{marginVertical: 12}}>OR</Text>
            <TouchableOpacity onPress={() => navigation.navigate("register")}>
                <Text style={{color: "#900", height: 30}}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("forgetpassword")}>
                <Text style={{height: 30}}>Forget Password</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginVertical: 10,
        padding: 10,
        paddingLeft: 15,
        fontSize: 15
    },
    submitBtn: {
        backgroundColor: "#900",
        width: '70%',
        padding: 5,
        borderRadius: 5,
        marginTop: 10
    },
    btnText: {
        color: "#fff",
        alignSelf: "center",
        fontSize: 20
    }
})