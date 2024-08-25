import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { updatePassword } from "../redux/action";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const dispatch = useDispatch();

    const changePasswordHandler = () => {
        dispatch(updatePassword(oldPassword, newPassword));
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>Change Password</Text>
            <View style={{width: "70%"}}>
                <TextInput placeholder="Old Password" style={styles.input} value={oldPassword} onChangeText={setOldPassword} />
                <TextInput secureTextEntry placeholder="New Password" style={styles.input} value={newPassword} onChangeText={setNewPassword} />
            </View>
            <Pressable style={styles.submitBtn} disabled={!oldPassword || !newPassword} onPress={changePasswordHandler} >
                <Text style={styles.btnText}>Update</Text>
            </Pressable>
        </View>
    )
};

export default ChangePassword;

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