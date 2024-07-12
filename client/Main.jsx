import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Footer from "./components/Footer";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Camera from './screens/Camera';
import ChangePassword from './screens/ChangePassword';
import VerifyAccount from './screens/VerifyAccount';
import ForgetPassword from './screens/ForgetPassword';
import ResetPassword from './screens/ResetPassword';
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "./redux/action";
import Loader from './components/Loader';

const Stack = createNativeStackNavigator();

// toggle 
// mark as completed
// delete
// search a todo
// dropdown to select 
// mark all as completed


const Main = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyProfile());
    },[dispatch])

    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    console.log("isAuthenticated", isAuthenticated, loading)
    return (
        loading ? (
            <Loader /> 
        ) : (
            <>
            <Stack.Navigator initialRouteName={"login"}>
                <Stack.Screen name="home" component={Home} options={{headerShown: false}} />
                <Stack.Screen name="login" component={Login} options={{headerShown: false}} />
                <Stack.Screen name="profile" component={Profile} options={{headerShown: false}} />
                <Stack.Screen name="register" component={Register} options={{headerShown: false}} />
                <Stack.Screen name="camera" component={Camera} options={{headerShown: false}} />
                <Stack.Screen name="changepassword" component={ChangePassword} options={{headerShown: false}} />
                <Stack.Screen name="verifyaccount" component={VerifyAccount} options={{headerShown: false}} />
                <Stack.Screen name="forgetpassword" component={ForgetPassword} options={{headerShown: false}} />
                <Stack.Screen name="resetpassword" component={ResetPassword} options={{headerShown: false}} />
            </Stack.Navigator>
            { isAuthenticated && <Footer /> }
            </>
            )
    )
};

export default Main;
