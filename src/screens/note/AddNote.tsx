import React, { ReactElement } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Animated, Platform, KeyboardAvoidingView } from 'react-native';
import { HandlerStateChangeEvent, PanGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import Context from '../../context/Context';
import { ContextType } from '../../context/InterfacesTypes';
import DatePick from "../../components/datePick/DatePick";
import Colors from '../../components/colors/Colors';
import Switcher from '../../components/switcher/Switcher'

import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';
const { width, height } =  Dimensions.get('window');

const VIEW_HEIGHT = height *.87;

interface Props {}

const AddNote: React.FC<Props> = () => {
  let offset = 0;
  const [date, setDate] = React.useState<Date>(new Date());
  const [hour, setHour] = React.useState<string>('');
  const [mode, setMode] = React.useState<'date' | 'time' | undefined>('date');
  const [colors, setColors] = React.useState([{color: 'red', selected: true}, {color: 'green', selected: false}, {color: 'blue', selected: false}, {color: 'yellow', selected: false}])
  const [isEnabled, setIsEnabled] = React.useState(false);
  const { openAddNote, setOpenAddNote, eventsCalendar, setEventsCalendar, eventsNote, setEventsNote } = React.useContext(Context) as ContextType; 
  const [show, setShow] = React.useState(false);
  const [subject, setSubject] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const taskDescripRef =  React.createRef<TextInput>();

  React.useEffect(() => {
    openScreen();
  },[openAddNote]);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); 
    setDate(new Date(currentDate));
  };
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const translateY = React.useRef(new Animated.Value(0)).current;
  const handleGestureEvent = Animated.event([{ nativeEvent: { translationY: translateY }}], { useNativeDriver: true })

  const openScreen = () => {
    Animated.timing(translateY, {
      toValue: openAddNote ? -VIEW_HEIGHT+10 : 0, 
      duration: 200, 
      useNativeDriver: true
    }).start(() => {
      offset = openAddNote ? -VIEW_HEIGHT+10 : 0;
      translateY.setOffset(offset); // set the point to start a new animation moviment.
    });
  }

  const closeScreen = () => {
    Animated.timing(translateY, {
      toValue: openAddNote ? -VIEW_HEIGHT+10 : 0, 
      duration: 200, 
      useNativeDriver: true
    }).start(() => {
      setOpenAddNote(false);
      offset = 0;
      translateY.setOffset(offset); // set the point to start a new animation moviment.
    });
  }

  const handleNote = () => {
    const color = colors.filter(item => { 
      if(item.selected) { 
        return item.color 
      }})[0].color;

      const key = format(date, 'YYY-MM-dd');
      const newCalendasEvent = { [key]: { selected: true, selectedColor: 'red' } }
      const newEventsNote = {
              key: key,
              subject: subject, 
              body: taskDescription,
              date: format(date, 'dd/MM/YYY'),
              hour: format(date, 'HH:mm'), 
              done: false,
              color: color ? color: 'red'
      }
      setEventsCalendar({...eventsCalendar, ...newCalendasEvent });
      setEventsNote([...eventsNote, newEventsNote]);

      setSubject('');
      setTaskDescription('');
      setDate(new Date());
      setColors([{color: 'red', selected: true}, {color: 'green', selected: false}, {color: 'blue', selected: false}, {color: 'yellow', selected: false}]);
      
      Animated.timing(translateY, {
        toValue: openAddNote ? -VIEW_HEIGHT+10 : 0, 
        duration: 200, 
        useNativeDriver: true
      }).start(() => {
        setOpenAddNote(false);
        offset = 0;
        translateY.setOffset(offset); // set the point to start a new animation moviment.
      });
  }

  function handleStateChange(event: HandlerStateChangeEvent){
    if(event.nativeEvent.oldState === State.ACTIVE){
        let opened = false;
        const { translationY } = event.nativeEvent;
        offset = 0

        offset += translationY;

        if(translationY >= 50){
            opened = true;
        } else {
          translateY.setValue(offset);
          offset = 0;
        }

        Animated.timing(translateY, {
          toValue:  opened ?  0 : -VIEW_HEIGHT+10,
          useNativeDriver: true, 
          duration: 200,
        }).start(() => {
          offset = opened ?  0 : -VIEW_HEIGHT+10;
          translateY.setOffset(offset); 
          translateY.setValue(0); 
          opened && setOpenAddNote(false);
        })
    }
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

  return (
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleStateChange}
      >
        <Animated.View style={[styles.container,
          {
              transform: [{ translateY: translateY.interpolate({
                inputRange: [-VIEW_HEIGHT+10,0],
                outputRange: [-VIEW_HEIGHT+10,0],
                extrapolate: 'clamp'
              }) 
            }]
          }
        ]}>
            <View style={styles.header}>
              <Text style={{ color: '#fff', fontSize: 18 }}>Nova Tarefa</Text>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => closeScreen()}
              >
                  <AntDesign name="close" size={28} color="#fff" />
              </TouchableOpacity> 
            </View>

            <DatePick 
              date={date} 
              setDate={onChange} 
              show={show} 
              setShow={setShow} 
              mode={mode} 
              setMode={setMode}
            />

            <View style={{ flex: .2 }}>
              <Text style={[{fontSize: fontSizer(width)}, styles.titleSubjectTask]}>Assunto: </Text>
              <TextInput
                autoCorrect={false}
                returnKeyType={'next'}
                value={subject}
                onChangeText={text => setSubject(text)} 
                style={styles.textInputStyle}
                onSubmitEditing={() => taskDescripRef.current?.focus()}
              />
            </View>
            <View style={{ flex: .25 }}>
              <Text style={[{fontSize: fontSizer(width)}, styles.titleSubjectTask]}>Tarefa: </Text>
              <TextInput
                autoCorrect={false}
                ref={taskDescripRef}
                value={taskDescription}
                onChangeText={text => setTaskDescription(text)}  
                multiline
                style={styles.textInputStyle}
              />
            </View>

            <View style={styles.colorsSwitcher}>
              <Colors colors={colors} setColors={setColors} />
              <Switcher toggleSwitch={toggleSwitch} isEnabled={isEnabled} />
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity 
                style={styles.buttonSave} 
                onPress={() => handleNote()}
              >
                  <Text style={styles.textButtonSave}>Salvar</Text>
              </TouchableOpacity> 
            </View>
        </Animated.View>
      </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    zIndex: 15,
    position: 'absolute',
    top: VIEW_HEIGHT+10, 
    left: 0,
    flex: 1,
    height: VIEW_HEIGHT,
    width, 
    backgroundColor: '#2D2C2C', 
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  }, 
  header: {
    flex: .1, 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  closeButton: {
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 30 , 
    height: 30
  }, 
  titleSubjectTask: {
    color: '#fff', 
    marginBottom: 5
  }, 
  textInputStyle: {
    color: '#fff', 
    borderBottomColor: '#fff',
    borderBottomWidth: 1
  }, 
  buttonSave: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ee4540',
    borderRadius: 10,
    width: 120,
    height: 50
  }, 
  textButtonSave: {
     color: '#fff',
     fontWeight: 'bold',
     fontSize: 20 
  }, 
  colorsSwitcher: {
    flex: .2, 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  }
})

export default AddNote;