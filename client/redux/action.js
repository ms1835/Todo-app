
const serverURL = "http://192.168.211.106:4000/api/v1";

export const login = (email, password) => async(dispatch) => {
    try{
        dispatch({type: 'loginRequest'});
        const response = await fetch(`${serverURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        console.log("Data: ", data);
        dispatch({type: 'loginSuccess', payload: data});
    } catch(err) {
        dispatch({type: 'loginFailure', payload: err.message});
        console.log("Error: ", err);
    }
}

export const getMyProfile = () => async(dispatch) => {
    try{
        dispatch({type: 'loadUserRequest'});

        const response = await fetch(`${serverURL}/profile` );
        const data = await response.json();
        console.log("Profile: ", data);
        dispatch({type: 'loadUserSuccess', payload: data});
    } catch(err) {
        dispatch({type: 'loadUserFailure', payload: err.message});
    }
}

export const addTask = (title, description) => async(dispatch) => {
    try{
        dispatch({ type: 'addTaskRequest'});

        const response = await fetch(`${serverURL}/newTask`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ title, description})
        })
        const data = await response.json();
        console.log("Add task: ",data);
        dispatch({ type: 'addTaskSuccess', payload: data.message});
    }
    catch(err) {
        console.log(err);
        dispatch({ type: 'addTaskFailure', payload: err.message});
    } 
}

export const updateTask = (taskId) => async(dispatch) => {
    try{
        dispatch({ type: 'updateTaskRequest'});
        const response = await fetch(`${serverURL}/task/${taskId}`);
        const data = await response.json();
        console.log("Update task: ",data);
        dispatch({ type: 'updateTaskSuccess', payload: data.message});
    }
    catch(err) {
        console.log(err);
        dispatch({ type: 'updateTaskFailure', payload: err.message});
    } 
}

export const deleteTask = (taskId) => async(dispatch) => {
    try{
        dispatch({ type: 'deleteTaskRequest'});

        const response = await fetch(`${serverURL}/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json"
            }
        })
        const data = await response.json();
        console.log("Delete task: ",data);
        dispatch({ type: 'deleteTaskSuccess', payload: data.message});
    }
    catch(err) {
        console.log(err);
        dispatch({ type: 'deleteTaskFailure', payload: err.message});
    } 
}

export const updateProfile = (formData) => async(dispatch) => {
    try{
        dispatch({ type: 'updateProfileRequest'});
        const response = await fetch(`${serverURL}/updateProfile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        });
        const data = await response.json();
        console.log("Update profile: ",data);
        dispatch({ type: 'updateProfileSuccess', payload: data.message});
    }
    catch(err) {
        console.log(err);
        dispatch({ type: 'updateProfileFailure', payload: err.message});
    } 
}

export const logout = () => async(dispatch) => {
    try{
        dispatch({ type: 'logoutRequest'});
        const response = await fetch(`${serverURL}/logout`);
        const data = await response.json();
        console.log("Logout: ",data);
        dispatch({ type: 'logoutSuccess'});
    }
    catch(err) {
        console.log(err);
        dispatch({ type: 'logoutFailure', payload: err.message});
    } 
}

export const register = (formData) => async(dispatch) => {
    try{
        dispatch({ type: 'registerRequest'});
        const response = await fetch(`${serverURL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        });
        const data = await response.json();
        console.log("Register: ",data);
        dispatch({ type: 'registerSuccess', payload: data});
    }
    catch(err) {
        console.log(err);
        dispatch({ type: 'registerFailure', payload: err.message});
    } 
}

export const updatePassword = (oldPassword, newPassword) => async(dispatch) => {
    try{
        dispatch({ type: 'updatePasswordRequest'});
        const response = await fetch(`${serverURL}/updatePassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldPassword, newPassword })
        });
        const data = await response.json();
        console.log("Update password: ",data);
        dispatch({ type: 'updatePasswordSuccess', payload: data.message});
    }
    catch(err) {
        console.log(err);
        dispatch({ type: 'updatePasswordFailure', payload: err.message});
    } 
}

export const verify = (otp) => async(dispatch) => {
    try{
        dispatch({ type: 'verifyAccountRequest'});
        const response = await fetch(`${serverURL}/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ otp })
        });
        const data = await response.json();
        console.log("Verify account: ",data);
        dispatch({ type: 'verifyAccountSuccess', payload: data.message});
    }
    catch(err) {
        console.log(err);
        dispatch({ type: 'verifyAccountFailure', payload: err.message});
    }
}

export const forgetPassword = (email) => async(dispatch) => {
    try{
        dispatch({ type: 'forgetPasswordRequest'});
        const response = await fetch(`${serverURL}/forgetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        console.log("Forget password: ",data);
        dispatch({ type: 'forgetPasswordSuccess', payload: data.message});
    }
    catch(err) {
        console.log(err);
        dispatch({ type: 'forgetPasswordFailure', payload: err.message});
    } 
}

export const resetPassword = (otp, newPassword) => async(dispatch) => {
    try{
        dispatch({ type: 'resetPasswordRequest'});
        const response = await fetch(`${serverURL}/resetPassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ otp, newPassword })
        });
        const data = await response.json();
        console.log("Reset password: ",data);
        dispatch({ type: 'resetPasswordSuccess', payload: data.message});
    }
    catch(err) {
        console.log(err);
        dispatch({ type: 'resetPasswordFailure', payload: err.message});
    } 
}