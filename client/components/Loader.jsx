import React from 'react';
import { View, StyleSheet} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Loader = () => {
    <View style={styles.container}>
        <ActivityIndicator animating={true} size={100} color='#900' />
    </View>
}

export default Loader;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})