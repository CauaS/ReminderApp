import React from 'react';
import Constants from 'expo-constants';
import { View, Image, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
// import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row' , justifyContent: 'space-between'}} >                                        
            <View style={styles.containerIcon}>
                <Ionicons name="ios-menu-outline" size={36} color="white" />
            </View>
            <View  style={styles.containerImage}>
                <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'}} 
                    style={styles.image}
                />
            </View>
        </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 65, 
    backgroundColor:"#252525"
  },
  containerIcon: {
    marginHorizontal: 15,
    marginTop: 15
  },
  containerImage:  {
    marginRight: 20, 
    marginTop: 15,
    borderWidth: 3, 
    borderColor: '#fff' ,
    borderRadius: 20
  },
  image: {
    width: 35 , 
    height: 35 , 
    borderRadius: 50, 
    resizeMode: 'cover'
  }
})