import React from 'react';
import { View, StyleSheet, Dimensions } from "react-native";
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { ContextType } from "../../context/InterfacesTypes";
import { format } from "date-fns";
import Context from '../../context/Context';
import AddButton from '../../components/addButton/AddButton';
import Tasks from '../tasks/Tasks';
import AddNote from '../note/AddNote';

const { width, height } = Dimensions.get('window');
const CALENDAR_HEIGHT = height * .7;

LocaleConfig.locales['pt-BR'] = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev.','Mar','Apr','Mai','Jun','Jul','Ago','Set.','Out','Nov','Dez'],
    dayNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    dayNamesShort: [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb" ],
};
LocaleConfig.defaultLocale = 'pt-BR';

const theme = {
    calendarBackground: '#252525', //background calendar
    textSectionTitleColor: '#fff', //short week descriptons
    dayTextColor: '#fff', // day color
    monthTextColor: '#fff', // month color
    textMonthFontSize: 20, //month fontsize
    textDayFontSize: 16, // day fontsIZE
    textMonthFontWeight: 'bold',
    'stylesheet.calendar.header': {
        week: {
          marginTop: 15,
          paddingBottom: 20,
          marginBottom: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: "#fff",
          borderBottomWidth: StyleSheet.hairlineWidth
        },
      }
}
const Month : React.FC = () => {
    const { eventsCalendar,  eventsNote, setEventsNoteToday } = React.useContext(Context) as ContextType; 

    function handleDayPress(day: string){
        const tasksToday = eventsNote.filter( note => note.key === day);
        setEventsNoteToday(tasksToday);
    }
   
    return (
        <View style={ styles.container}>
            <CalendarList
                style={{ height: CALENDAR_HEIGHT}}
                onMonthChange={(month) => {console.log('month changed', month)}}
                horizontal={true}
                onDayPress={date => handleDayPress(date.dateString)}
                pagingEnabled={true}
                pastScrollRange={12}
                futureScrollRange={12}
                scrollEnabled={true}
                showScrollIndicator={false}
                theme={theme}
                calendarWidth={width}
                markedDates={{...eventsCalendar}}
                enableSwipeMonths={true}
                minDate={new Date()}
            />
           
            <Tasks/>
            <AddButton/>
            <AddNote/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    }
  });

export default Month;