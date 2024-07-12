import { getMyProfile, verify } from "@/redux/action";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useDispatch } from "react-redux";

const VerifyAccount = () => {
    const [otp, setOtp] = useState();
    const dispatch = useDispatch();

    const verifyHandler = async() => {
        await dispatch(verify(otp));
        dispatch(getMyProfile());
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>Welcome</Text>
            <View style={{width: "70%"}}>
                <TextInput placeholder="Otp" style={styles.input} value={otp} onChangeText={setOtp} keyboardType="number-pad" />
            </View>
            <Pressable style={styles.submitBtn} onPress={verifyHandler} >
                <Text style={styles.btnText}>Verify</Text>
            </Pressable>
        </View>
    )
};

export default VerifyAccount;

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