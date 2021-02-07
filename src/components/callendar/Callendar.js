import './callendar.scss'
import styled from 'styled-components';

import CallendarHeader from './CallendarHeader'
import CallendarBody from './CallendarBody'



export const DayBlock = styled.div`
  border: 1px solid black;
  height:120px;
  background-color:#00fff308;
  padding: 5px;
  &:hover{
      background-color:#5a798808;
  }
`;


const Callendar = (props)=> { 
    return (
<div className="calendar">
    <CallendarHeader/>
    <CallendarBody/>

  </div>
    )
}


export default Callendar