import { createSlice } from '@reduxjs/toolkit'

const defaultState = {
  title: "",
  description: "",
  city: "",
  color:"#000000"
}


const eventSlice = createSlice({
    name: 'Event',
    initialState: {
      event:defaultState,
      dialogOpen:false,
      dialogTitle:'New Event'
    },
    reducers:{
      newEvent: (state,action)=>{
        return {dialogOpen:true, event:{...defaultState, date: action.payload}, dialogTitle:"New Event"}
      },
      editEvent: (state,action)=>{
        return {dialogOpen:true, event:{...action.payload}, dialogTitle:"Edit Event"}
      },
      clearEvent: ()=>{
        return {dialogOpen:false, event:{...defaultState}}
      },
    }
})
export const { newEvent , editEvent, clearEvent } = eventSlice.actions
export default eventSlice.reducer
