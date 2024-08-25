import { forgetPassword } from "@/redux/action";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ForgetPassword = () => {
    const [email, setEmail] = useState();

    const { loading } = useSelector(state => state.message);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const forgetPasswordHandler = async() => {
        await dispatch(forgetPassword(email));
        
        navigation.navigate("resetpassword");
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>Create New Password</Text>
            <View style={{width: "70%"}}>
                <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
            </View>
            <Pressable style={styles.submitBtn} disabled={loading} loading={loading} onPress={forgetPasswordHandler} >
                <Text style={styles.btnText}>Send Mail</Text>
            </Pressable>
        </View>
    )
};

export default ForgetPassword;

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
        backgroundColor: "darkslateblue",
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
});