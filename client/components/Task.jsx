import { View, Text, StyleSheet } from "react-native";
import React, { useState } from 'react';
import { Checkbox } from "react-native-paper";
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from "react-redux";
import { deleteTask, getMyProfile, updateTask } from "@/redux/action";

const Task = ({taskId, title, description, status}) => {
    const [completed, setCompleted] = useState(status);
    const dispatch = useDispatch();

    const handleCheckBox = () => {
        setCompleted(!completed);
        dispatch(updateTask(taskId));
    }

    const handleDelete = async() => {
        await dispatch(deleteTask(taskId));
        dispatch(getMyProfile());
    }

    return (
        <View style={styles.container}>
            <View style={{width: '70%'}}>
                <Text style={{fontSize: 20, color: "teal"}}>{title}</Text>
                <Text>{description}</Text>
            </View>
            <Checkbox status={completed ? "checked" : "unchecked"} onPress={handleCheckBox} />
            <Icon name="delete" color="#fff" size={20} style={{backgroundColor: "peru", padding: 8, borderRadius: 100}} onPress={handleDelete} />
        </View>
    )
};

export default Task;

const styles = StyleSheet.create({
    container: {
        padding: 10, 
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})