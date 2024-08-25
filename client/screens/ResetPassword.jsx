import { resetPassword } from "@/redux/action";
import { useNavigation } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ResetPassword = () => {
    const [otp, setOtp] = useState();
    const [newPassword, setNewPassword] = useState();

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { error, message } = useSelector(state => state.message);

    const resetPasswordHandler = async() => {
        await dispatch(resetPassword(otp, newPassword));
        navigation.navigate("login");
    }

    useEffect(() => {
        if(error){
            alert(error);
            dispatch({type: 'clearError'});
        }
        if(message){
            alert(message);
            dispatch({ type: 'clearMessage'});
        }
    }, [alert, message, error, dispatch]);


    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>Change Password</Text>
            <View style={{width: "70%"}}>
                <TextInput placeholder="Otp" style={styles.input} value={otp} onChangeText={setOtp} keyboardType="number-pad" />
                <TextInput secureTextEntry placeholder="New Password" style={styles.input} value={newPassword} onChangeText={setNewPassword} />
            </View>
            <Pressable style={styles.submitBtn} disabled={!otp || !newPassword} onPress={resetPasswordHandler} >
                <Text style={styles.btnText}>Reset Password</Text>
            </Pressable>
        </View>
    )
};

export default ResetPassword;

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
})