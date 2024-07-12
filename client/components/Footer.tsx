import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
    const navigation = useNavigation();

    return (
        <View style={{flexDirection: "row", padding: 20, justifyContent: "space-around", backgroundColor: "gray"}}>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Icon name="home" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                <Icon name="user" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

export default Footer;