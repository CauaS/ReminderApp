export interface Props {
    children: React.ReactNode
}
export interface IEventsCalendar {
    [key: string]: {
        selected?: boolean,
        marked?: boolean,
        selectedColor?: string,
        disabled?: boolean,
        disableTouchEvent?: boolean,
        dotColor?: string,
        activeOpacity?: number,
        startingDay?: boolean,
        endingDay?: boolean,
        color?: string,
        textColor?: string
    }
}
export interface IEventsNote {
    key: string,
    subject: string,
    body: string, 
    date: string,
    hour: string, 
    done: false,
    color: string
}
export type  ContextType = {
    eventsCalendar:{
        [key: string]: {
           selected?: boolean,
           marked?: boolean,
           selectedColor?: string,
           disabled?: boolean,
           disableTouchEvent?: boolean,
           dotColor?: string,
           activeOpacity?: number,
        },
       },
    eventsNote: IEventsNote[],
    setEventsNote: React.Dispatch<React.SetStateAction<IEventsNote[]>>,
    setEventsCalendar: React.Dispatch<React.SetStateAction<IEventsCalendar>>,
    eventsNoteToday: IEventsNote[],
    setEventsNoteToday: React.Dispatch<React.SetStateAction<IEventsNote[]>>
    openAddNote: boolean
    setOpenAddNote: React.Dispatch<React.SetStateAction<boolean>>
}
