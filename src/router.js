import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import Login from '../src/screens/home/index';


function Route(){
    const Stack = createStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen>
                    { props => <Login {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}