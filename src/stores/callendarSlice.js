import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import Utils from '../utils'

const callendarSlice = createSlice({
    name: 'callendar',
    initialState: {
      events:[], 
      currentDate:moment().format()  
    },
    reducers:{
      nextMonth: (state,action)=>{
        let newDate = moment(state.currentDate).add(1,'month')
        return {...state, currentDate:newDate}
      },
      prevMonth: (state,action)=>{
        let newDate = moment(state.currentDate).subtract(1,'month')
        return {...state, currentDate:newDate}
      },
      deleteCallendarEvent: (state,action)=>{
        return {...state, events:state.events.filter(event=> event.id !== action.payload)}
      },
      deleteDayEvents: (state,action)=>{
        let arrIds = action.payload.map(event=> event.id)
        return {...state, events:state.events.filter(event=> !arrIds.includes(event.id))}
      },
      handleCallendarEvent: (state,action)=>{
        const date = moment(action.payload.date).format('YYYY-MM-DDTHH:mm')
          if(!action.payload.id){
          const newEvent = {
            ...action.payload,
            date,
            id: Utils.generateGUID()
          }
          return {...state, events:[...state.events,newEvent]}
        }
        else{
          const newEventsArr = state.events.map(item=> {
            if(item.id === action.payload.id){
              return  {
                ...action.payload,
                date,
              }
            }
            else{
              return item
            }
          })
          return {...state, events:newEventsArr}
        }
      },
    }
})
export const { nextMonth , prevMonth, handleCallendarEvent, deleteCallendarEvent, deleteDayEvents } = callendarSlice.actions
export default callendarSlice.reducer
