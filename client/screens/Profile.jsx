import { getMyProfile, logout, updateProfile } from "@/redux/action";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable } from "react-native";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import mime from "mime";
import Loader from "@/components/Loader";

const Profile = ({ route }) => {
    const { user, loading } = useSelector(state => state.auth);

    const [avatar, setAvatar] = useState(user.avatar.url);
    const [name, setName] = useState(user.name);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleProfileChange = () => {
        navigation.navigate("camera", { updateProfile: true});
    }

    const submitHandler = async() => {
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("avatar", {
            uri: avatar,
            public_id: "test",
            type: mime.getType(avatar),
            name: avatar.split("/").pop()
        })

        await dispatch(updateProfile(myForm));
        dispatch(getMyProfile());
    }

    const logoutHandler = () => {
        dispatch(logout());
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
                style={{backgroundColor: "#900"}}
            />
            <TouchableOpacity style={{marginVertical: 8}} onPress={handleProfileChange}>
                <Text style={{color: "#900", fontSize: 16}}>Change Photo</Text>
            </TouchableOpacity>
            <View style={{width: "70%"}}>
                <TextInput style={styles.input} value={name} onChangeText={setName} />
            </View>
            <Pressable style={styles.submitBtn} disabled={ !name } onPress={submitHandler} >
                <Text style={styles.btnText}>Update</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("changepassword")} >
                <Text style={styles.helperBtn}>Change Password</Text>
            </Pressable>
            <Pressable onPress={logoutHandler} >
                <Text style={styles.helperBtn}>Logout</Text>
            </Pressable>
            {
                user.verified ? null :
                <Pressable onPress={() => navigation.navigate("verifyaccount")} >
                    <Text style={styles.helperBtn}>Verify Account</Text>
                </Pressable>
            }
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
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
        marginVertical: 10
    },
    btnText: {
        color: "#fff",
        alignSelf: "center",
        fontSize: 20
    },
    helperBtn: {
        color: 'rgb(80,50,50)',
        fontSize: 16,
        marginVertical: 6
    }
})