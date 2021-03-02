import React from 'react';
import Context from "./Context";

import { IEventsCalendar, IEventsNote, Props } from "./InterfacesTypes";

const Provider: React.FC<Props> = ({ children }) => {
    const [eventsCalendar, setEventsCalendar] = React.useState<IEventsCalendar>({});
    const [eventsNote, setEventsNote] = React.useState<IEventsNote[]>([]);
    const [eventsNoteToday, setEventsNoteToday] = React.useState<IEventsNote[]>([]);
    const [openAddNote, setOpenAddNote] = React.useState(false);

    return(
        <Context.Provider
            value={{ 
                eventsCalendar, 
                setEventsCalendar,
                eventsNote, 
                setEventsNote,
                eventsNoteToday,
                setEventsNoteToday,
                openAddNote,
                setOpenAddNote
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default Provider;