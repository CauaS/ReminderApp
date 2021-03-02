import React from 'react';
import { View, StyleSheet, LogBox , StatusBar } from "react-native";
import Month from '../month/Month';
import Header from '../../components/header/Header';

LogBox.ignoreAllLogs();
const Home: React.FC = () => {
    return ( 
        <View style={styles.container}>
            <StatusBar backgroundColor="#252525" barStyle="light-content"/>
            <Header />
            <Month />
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252525'
    }
})
  