import React from 'react';
import { View,  Text,  TouchableOpacity, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const { widht } = Dimensions.get('window');

interface Props {
    colors: {
        color: string;
        selected: boolean;
    }[]
    setColors: React.Dispatch<React.SetStateAction<{
        color: string;
        selected: boolean;
    }[]>>
}

const Colors: React.FC<Props> = ({ colors, setColors }) => {

  const handleColorSelected = (color: string) => {
      const newColors = colors.map( item => {
          return item.color === color
            ? { ...item, selected: true }
            : { ...item, selected: false }
      });

      setColors(newColors);
  }

  const fontSizer = React.useCallback((width) => {
    if(width > 400){
        return 20;
    }else if(width > 250){
        return 18;
    }else { 
        return 15;
    }
  },[]);

  return(
    <View>
        <Text style={{ color: '#fff',fontSize: fontSizer(widht), marginBottom: 5 }}>Color: </Text>
        <View style={{ flexDirection: 'row'}}>
            {
                colors.map( (colorOption, index) => (
                    <TouchableOpacity 
                        key={index}
                        onPress={(() => handleColorSelected(colorOption.color) )}
                        activeOpacity={.7} 
                        style={{ backgroundColor: colorOption.color, padding: 8, borderRadius: 15, marginRight: 5 }}
                    >
                        { colorOption.selected && <Entypo name="check" size={20} color="white" />}
                        { !colorOption.selected && <View style={{ width: 20, height: 20 }}/>}
                    </TouchableOpacity>
                ))
            }
        </View>
    </View>
  );
}

export default Colors;