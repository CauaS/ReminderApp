import React from 'react';
import { TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import Context from '../../context/Context';
import { ContextType } from '../../context/InterfacesTypes';

const { width, height } = Dimensions.get('window');

interface Prosp {}

const AddButton: React.FC<Prosp> = () => {
  const { setOpenAddNote } = React.useContext(Context) as ContextType; 
  
  return (
      <TouchableOpacity 
          activeOpacity={.7}
          onPress={() => setOpenAddNote(open => !open)}
          style={styles.addButton}
        >
          <Text style={styles.icon}>+</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    zIndex: 2,
    position: 'absolute', 
    bottom: height * .05,
    right: width * .1,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ee4540',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    fontSize: 35, 
    color: '#fff'
  }
})
export default AddButton;