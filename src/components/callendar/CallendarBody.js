import './callendar.scss'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import EventDialog from '../event/EventDialog'
import DeleteDayDialog from '../deleteDayEvents/DeleteDayDialog'
import React from 'react'
import { newEvent, editEvent } from '../../stores/eventSlice'
import Utils from '../../utils'
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';


export const DayBlock = styled.div`
  border: 1px solid #fff;
  height:120px;
  display:inline-flex;
  justify-content: space-between;
  overflow-y: ${props => props.scroll ? "scroll" : "none"};
  color: ${props => !props.isCurrentMonth ? '#a3a6affa' : (props.isWeekend ? '#117cda8a' : '')};
  background-color:${props => props.isWeekend || !props.isCurrentMonth ? '#0000000d' : '#5a798808'};
  border-bottom:${props => props.isToday ? '2px solid blue': ""}; 
  padding: 5px;
  &:hover{
      background-color:${props => props.isWeekend || !props.isCurrentMonth ? '#1e1e1e0d' : '#c9dee908'};
  }
  
`;

export const EventBlock = styled.div`
  background-color:${props => props.color};
  color: ${props => Utils.invertColor(props.color, true)};
  cursor: pointer;
  border-radius: 5px;
  padding: 3px;
  margin: 3px;
  font-size: medium;
  min-width: 100px;
`;


export const DateSpan = styled.span`
padding: 0 5px;
cursor:pointer;
border-radius: 100%;
&:hover{
    background-color:#697a820d;
}
`;


const getCallendarDays = (date) => {
    const currentday = moment(date).date(1)
    const callendarDates = []
    const validMonths = [date.format('MMMM')]
    while (currentday.format('ddd') !== 'Sun') {
        currentday.format('ddd')
        currentday.subtract(1, 'days')
        if (validMonths.some(date => currentday.format('MMMM') !== date)) {
            validMonths.push(currentday.format('MMMM'))
        }
    }

    while (validMonths.some(date => currentday.format('MMMM') === date) || currentday.format('ddd') !== 'Sun') {

        callendarDates.push({
            day: moment(currentday),
            isWeekend: currentday.day() === 0 || currentday.day() === 6,
            isCurrentMonth: currentday.format('MMMM') === date.format('MMMM')
        })
        currentday.add(1, 'days')
    }

    return (callendarDates)

}


const CallendarBody = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector(({ callendar }) => callendar.currentDate)
    const events = useSelector(({ callendar }) => callendar.events)
    const [open, setOpen] = React.useState(false);
    const [deleteEvents, setDeleteEvents] = React.useState([]);


    const days = getCallendarDays(moment(currentDate))

    const handleEditEvent = (e, event) => {
        e.stopPropagation();
        dispatch(editEvent(event))
    }

    const handleDayDelete = (e, events) => {
        e.stopPropagation();
        setOpen(true)
        setDeleteEvents(events)
    }


    return (
        <>
            <div className="date-grid">
                <EventDialog />
                <DeleteDayDialog open={open} setOpen={setOpen} events={deleteEvents}/>
                {days.map((item, i) => {
                    let dayEvents = events.filter(x => moment(x.date).format('YYYY-MM-DD') === item.day.format('YYYY-MM-DD')).sort((a, b) => moment(a.date).diff(moment(b.date)))
                    return (
                        <DayBlock
                            id={"day-block"+i}
                            data-testId={"day-block"+i}

                            key={i} scroll={dayEvents&& dayEvents.length>3} 
                            onClick={() => { dispatch(newEvent(moment(item.day).format('L'))) }} 
                            isWeekend={item.isWeekend} 
                            isCurrentMonth={item.isCurrentMonth}
                            isToday={moment().format("YYYY-MM-DD") ===  item.day.format("YYYY-MM-DD")}
                         >
                            <div style={{ display: "inline-flex" }}><div><DateSpan>{item.day.date()}</DateSpan></div>
                                <div style={{    marginLeft: '25px'}} >
                                    {   dayEvents
                                        .map((event, i) => (
                                            <EventBlock onClick={(e) => handleEditEvent(e, event)} color={event.color}>{moment(event.date).format("HH:mm")} - {event.title}</EventBlock>
                                        ))}
                                </div>
                            </div>
                            <div style={{textAlign:"center"}}>

                                {events.some(x => moment(x.date).format('YYYY-MM-DD') === item.day.format('YYYY-MM-DD')) &&
                                <div> <Tooltip title="Delete all" ><IconButton onClick={e=> handleDayDelete(e,dayEvents)}> <Icon fontSize="small">delete</Icon></IconButton></Tooltip></div>}
                            </div>
                        </DayBlock>)

                })}
            </div>
        </>)
}

export default CallendarBody