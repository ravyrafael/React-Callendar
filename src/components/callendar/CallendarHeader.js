import './callendar.scss'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import Icon from '@material-ui/core/Icon';
import moment from 'moment'
import IconButton from '@material-ui/core/IconButton';
import { nextMonth , prevMonth} from '../../stores/callendarSlice'

export const IconCenter = styled(Icon)`
    vertical-align:middle;
    padding: 0 10px; 
`;

const getWeekDays = () => {
    let weekArr = []
    for (var i = 0; i < 7; i++) {
        weekArr.push(moment().weekday(i).format('ddd'));
    }
    return weekArr
}


const CallendarHeader = () => {
    const dispatch = useDispatch()

    const date = useSelector(({ callendar }) => callendar.currentDate)
    const currentDate = moment(date)
    
    return (
        <>
            <div className="month-indicator">
                <IconButton onClick={()=>dispatch(prevMonth())}>
                    <IconCenter >navigate_before</IconCenter>
                </IconButton>
                {currentDate.format('MMMM YYYY')}
                <IconButton onClick={()=>dispatch(nextMonth())}>
                    <IconCenter>navigate_next</IconCenter>
                </IconButton>

            </div>
            <div className="day-of-week">
                {getWeekDays().map((item , i) =>
                    <div key={i}>{item}</div>
                )}
            </div>
        </>)
}

export default CallendarHeader