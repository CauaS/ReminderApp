import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Dimensions } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, formatISO9075 } from 'date-fns';

import { Entypo, Feather } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

interface Props {
    date: Date,
    setDate: (event: any, selectedDate: any) => void,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    mode: "date" | "time" | undefined, 
    setMode: React.Dispatch<React.SetStateAction<"date" | "time" | undefined>>
}

const DatePick: React.FC<Props> = ({ date, setDate, show, setShow, mode, setMode }) => {
    const fontSizer = React.useCallback((width) => {
        if(width > 400){
            return 25;
        }else if(width > 250){
            return 20;
        }else { 
            return 15;
        }
    },[]);
  return (
      <View style={styles.containerDate}>
        <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Entypo name="calendar" size={24} color="#ee4540" style={{ marginRight: 10  }}/>
            <Text
                onPress={() => { setShow(true), setMode('date') }}
                style={[{ fontSize: fontSizer(width)},styles.textDate]}>{format(date, 'dd/MM/YYY')}
            </Text>
            <Feather name="clock" size={24} color="#ee4540" style={{ marginLeft:35 , marginRight: 10  }}/>
            <Text
                onPress={() => { setShow(true), setMode('time')}}
                style={[{ fontSize: fontSizer(width)}, styles.textTime]}>{formatISO9075(date,  { representation: 'time' })}
            </Text>
        </TouchableOpacity>
        {
            show && <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="spinner"
                        locale="pt-BR"
                        onChange={setDate}
                        style={{ flex: 1}}
                    />
        }
      </View>
  )
}

const styles = StyleSheet.create({
    containerDate: {
        flex: .12
    },
    textDate: {
        color: '#fff',
    }, 
    textTime: {
        color: '#fff',
    }
})
export default DatePick;