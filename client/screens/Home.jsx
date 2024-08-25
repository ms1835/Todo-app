import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Task from '../components/Task';
import Icon from '@expo/vector-icons/Entypo';
import { Dialog, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addTask, getMyProfile } from "../redux/action";


const Home = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();
    const { loading, error, message } = useSelector(state => state.message);
    const { user } = useSelector(state => state.auth);
    
    const handleDialog = () => {
        setOpenDialog(!openDialog);
    }

    const addTaskHandler = async() => {
        console.log(title, description);
        await dispatch(addTask(title, description));
        dispatch(getMyProfile());
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
        <>
            <View style={{backgroundColor: "#fff",flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
                <ScrollView>
                    <SafeAreaView>
                        <Text style={styles.heading}>All Tasks</Text>
                        {
                            user && user.tasks.map((task) => (
                                <Task key={task._id} title={task.title} description={task.description} status={task.status} taskId={task._id}/>
                            ))
                        }
                        <TouchableOpacity style={styles.addBtn} onPress={handleDialog}>
                            <Icon name="add-to-list" size={24} color="darkslateblue" />
                        </TouchableOpacity>
                    </SafeAreaView>
                </ScrollView>
            </View>
            <Dialog visible={openDialog} onDismiss={handleDialog} >
                <Dialog.Title>Add A Task</Dialog.Title>
                <Dialog.Content>
                    <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
                    <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-end"}}>
                        <TouchableOpacity onPress={handleDialog}>
                            <Text>CANCEL</Text>
                        </TouchableOpacity>
                        <Button onPress={addTaskHandler} disabled={!title || !description || loading}>ADD</Button>
                    </View>
                </Dialog.Content>
            </Dialog>
        </>
    )
};

export default Home;

const styles = StyleSheet.create({
    heading: {
        backgroundColor: "steelblue", 
        color: "white", 
        textAlign: 'center', 
        fontSize: 20,
        paddingVertical: 8,
        marginBottom: 10
    },
    addBtn: {
        backgroundColor: '#fff',
        width: 150,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        borderRadius: 100,
        alignSelf: "center",
        marginVertical: 10
    },
    input: {
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginVertical: 10,
        padding: 10,
        paddingLeft: 15,
        fontSize: 15
    }
})