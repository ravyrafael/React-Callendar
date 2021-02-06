import './callendar.scss'
import styled from 'styled-components';
import { useSelector } from 'react-redux'
import moment from 'moment'

export const DayBlock = styled.div`
  border: 1px solid #fff;
  height:120px;
  background-color:${props => props.isWeekend || !props.isCurrentMonth ? '#0000000d' : '#5a798808'};
  ;
  padding: 5px;
  &:hover{
      background-color:${props => props.isWeekend || !props.isCurrentMonth ? '#0000000d' : '#c9dee908'};
  }
`;
const getCallendarDays = (currentDate) => {
    const currentday = moment(currentDate).date(1)
    const callendarDates = []
    const validMonths = [currentDate.format('MMMM')]
    while (currentday.format('ddd') !== 'Sun') {
        currentday.format('ddd')
        currentday.subtract(1, 'days')
        if(validMonths.some(date=> currentday.format('MMMM') !== date)){
            validMonths.push(currentday.format('MMMM'))
        }
    }

    while (validMonths.some(date=> currentday.format('MMMM') === date) || currentday.format('ddd') !== 'Sun') {
        
        callendarDates.push({
            day: moment(currentday), 
            isWeekend: currentday.day() === 0 || currentday.day() === 6,
            isCurrentMonth: currentday.format('MMMM') === currentDate.format('MMMM')})
        currentday.add(1, 'days')
    }

    return(callendarDates)

}


const CallendarBody = () => {
    const currentDate = useSelector(({ callendar }) => callendar.currentDate)

    const days = getCallendarDays(currentDate)
    return (
        <>
            <div className="date-grid">

                {days.map((item,i)=>{
                    return <DayBlock onClick={()=>{}} isWeekend={item.isWeekend} isCurrentMonth={item.isCurrentMonth}>{item.day.date()}</DayBlock>

                })}
            </div>
        </>)
}

export default CallendarBody