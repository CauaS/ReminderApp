import { Route } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import React from 'react';
import { View, Text } from 'react-native';


interface Props {
    route: Route<string, object>;
    navigation: StackNavigationProp<any>
}

const Login: React.FC<Props> = ({ route, navigation }) => {
    
  return(
      <View>
         <Text> Login </Text> 
      </View>
  );
}

export default Login;