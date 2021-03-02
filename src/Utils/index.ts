import WeekDays from "../weekDay/WeekDays";

function getWeekNumber(d: any): number | null {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNumber = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNumber;
}
const getDaysInMonthUTC = (month: number ,year: number): Date[] => {
    const  days = [];

      let date = new Date(Date.UTC(year, month, 1));
      while (date.getUTCMonth() === month && date.getUTCFullYear() === year) {          
        if(date.getFullYear() == year){
            days.push(new Date(date));
         }
        date.setUTCDate(date.getUTCDate() + 1);
    }
   
    return days;
}
  
const translateMonth = (numberMonth: number): string => {
    const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    return months[numberMonth]
}
  
const getWeekDay = (date: Date): string => {
    const weekdays = [ "dom", "seg", "ter", "qua", "qui", "sex", "sab" ];
    const  day = date.getDay();          
    return weekdays[day];
}

function setColor(year: number, month: number, day: number): string | null {
    var lastDay =  new Date(year, month, 0).getDate();

    return lastDay === day  ?  "#d3d3d3": null
}

export const allDays = (month: number) => {
    const allDaysOfThisMonth = getDaysInMonthUTC(month,2021);

    const allDaysYear = allDaysOfThisMonth.map(day => {
            return {
                day: day.getDate(),
                month: translateMonth(day.getMonth()),
                year: day.getFullYear(),
                weekDescription: getWeekDay(day),
                weekNumber: getWeekNumber(day)
                // color: setColor(2021, month, day.getDate())
            }
    });
    const alldaysMonthGroupedByWeekDesc = allDaysYear.reduce(function (acc: any, item: any) {
            acc[item.weekDescription] = acc[item.weekDescription] || [];
            acc[item.weekDescription].push(item);
      return acc;
    }, {});

    console.log(alldaysMonthGroupedByWeekDesc)

    return [alldaysMonthGroupedByWeekDesc];

}