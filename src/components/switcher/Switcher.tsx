import React from 'react';
import { View, Text, Switch } from 'react-native';

interface Props {
    toggleSwitch: () => void
    isEnabled: boolean
}

const Switcher: React.FC<Props> = ({ toggleSwitch, isEnabled}) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start'}}>
        <Text style={{ color: '#fff',fontSize: 20 }}>Alarme: </Text>
        <Switch
            trackColor={{ false: "#767577", true: "red" }}
            thumbColor={"#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
    </View>
  )
}

export default Switcher;