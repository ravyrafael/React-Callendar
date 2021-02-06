import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

const callendarSlice = createSlice({
    name: 'callendar',
    initialState: {
      callendar:[], 
      currentDate:moment()  
    },
    reducers:{
      nextMonth: (state,action)=>{
        console.log(state)
        let newDate = moment(state.currentDate).add(1,'month')
        return {...state, currentDate:newDate}
      },
      prevMonth: (state,action)=>{
        console.log(state)
        let newDate = moment(state.currentDate).subtract(1,'month')
        return {...state, currentDate:newDate}
      }
    }
})
export const { nextMonth , prevMonth } = callendarSlice.actions
export default callendarSlice.reducer
