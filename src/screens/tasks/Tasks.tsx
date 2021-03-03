import React from 'react';
import { View , Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import { ContextType, IEventsNote } from '../../context/InterfacesTypes';
import Context from '../../context/Context';

import { AntDesign } from '@expo/vector-icons';
import { HandlerStateChangeEvent, PanGestureHandler, ScrollView, State } from "react-native-gesture-handler";

import empty from "../../img/relaxing.png";

const { width, height} = Dimensions.get('window');
const MAX_HEIGHT = height * .41;
const DURATION =  100;

interface Props {}

const Tasks: React.FC<Props> = () => {
    let offSet = 0;
    const translateY = React.useRef(new Animated.Value(0)).current;
    const { eventsNoteToday } = React.useContext(Context) as ContextType; 

    const handleGestureEvent = Animated.event([{ nativeEvent: { translationY: translateY}} ], { useNativeDriver: true });
    const handleStateChange = (event: HandlerStateChangeEvent) => {
        if(event.nativeEvent.oldState === State.ACTIVE){
            let opened = false;
            const { translationY } = event.nativeEvent;
           
            offSet += translationY;

            if(translationY <= -50){
                opened = true;
            } else {
                translateY.setValue(offSet); // take the offset value and set a new value to translateY animated value
                translateY.setOffset(0);
                offSet = 0;
            }

            Animated.timing(translateY, {
                toValue: opened ? -MAX_HEIGHT : 0, 
                useNativeDriver: true, 
                duration: DURATION,
            }).start(() => {
                offSet = opened ? -MAX_HEIGHT : 0;
                translateY.setOffset(offSet); // set the point to start a new animation moviment.
                translateY.setValue(0); // set the value of translateY to 0.
            })
        }
    }

    const Header = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                <AntDesign name="up" size={24} color="#fff" />
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                    Atividades para hoje!
                </Text>
            </View>
        )
    }

    const Note = ({ task }) => {
        return (
            <View style={styles.taskItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }}>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{task.subject}</Text>
                    <Text style={{ color: '#fff', fontSize: 18 }}>{task.hour}</Text>
                </View>
                <View style={[{backgroundColor: `${task.color}` }, styles.elementLeft]} />
                <Text numberOfLines={2} style={{ color: '#fff', fontSize: 15, }}>{task.body}</Text>
            </View>
        )
    }

    const NoTask = () => {
        return (
            <View style={styles.noTask}>
                <Text style={{ color: '#fff', fontSize: 15 }}> Você não tem tarefas para esse dia.</Text>
                <Image 
                    source={empty}
                    style={{ marginTop: 20,height: 150 , width: 150 , resizeMode: 'contain'}}
                />
            </View>
        )
    }
  return ( 
     <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={event => handleStateChange(event)}
     >
        <Animated.View style={[
            styles.containerTask, 
            { transform: [
                 { translateY : translateY.interpolate({
                     inputRange: [-MAX_HEIGHT , 0, 50],
                     outputRange: [-MAX_HEIGHT, 0, 5 ],
                     extrapolate: 'clamp'
                 }) }
                 ]
            }]
        }>
            <View>
                <Header />
                <ScrollView 
                    scrollEventThrottle={16}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
                >
                    { eventsNoteToday && eventsNoteToday.map((task :IEventsNote, index:number) => ( <Note task={task} key={index}/> )) }
                    { eventsNoteToday.length === 0 && <NoTask /> }
                </ScrollView>
            </View>
        </Animated.View>
     </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
    cartItem: {
        width: width,
        height: 100,
        margin: 5
    },
    containerTask: {
        position: 'absolute',
        top: height * .5,
        zIndex: 1,
        backgroundColor: '#252525', 
        width ,
        height: height * .8,
    },
    taskItem: {
        position: 'relative',
        marginHorizontal: 15,
        marginTop: 10, 
        backgroundColor: '#rgba(0, 0, 0, 0.50)', 
        height: 80, 
        paddingTop: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    elementLeft: {
        position: 'absolute', 
        left: -2, 
        top: 30, 
        borderRadius:15, 
        height: 25, 
        width: 5
    },
    noTask: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
})

export default Tasks;