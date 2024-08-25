import { register } from "@/redux/action";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable } from "react-native";
import { Avatar } from "react-native-paper";
import { useDispatch } from "react-redux";
import mime from "mime";

const Register = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState();

    const dispatch = useDispatch();

    const registerHandler = () => {
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("avatar", {
            uri: avatar,
            public_id: "test",
            type: mime.getType(avatar),
            name: avatar.split("/").pop()
        })

        dispatch(register(myForm));
    }

    const handleProfileChange = () => {
        navigation.navigate('camera');
    }

    useEffect(() => {
        if(route.params) {
            if(route.params.image) {
                setAvatar(route.params.image);
            }
        }
    }, [route]);

    return (
        <View style={styles.container}>
            <Avatar.Image
                size={100}
                source={{uri: avatar ? avatar : undefined}}
                style={{backgroundColor: "darkslateblue"}}
            />
            <TouchableOpacity style={{marginVertical: 8}} onPress={handleProfileChange}>
                <Text style={{color: "darkslateblue", fontSize: 16}}>Change Photo</Text>
            </TouchableOpacity>
            <View style={{width: "70%"}}>
                <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
                <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
                <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
            </View>
            <Pressable style={styles.submitBtn} disabled={!name || !email || !password} onPress={registerHandler} >
                <Text style={styles.btnText}>Register</Text>
            </Pressable>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text style={{color: "darkslateblue", height: 30}}>Already have an account, Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
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
        backgroundColor: "darkslateblue",
        width: '70%',
        padding: 5,
        borderRadius: 5,
        marginVertical: 10
    },
    btnText: {
        color: "#fff",
        alignSelf: "center",
        fontSize: 20
    }
})