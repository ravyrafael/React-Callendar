import callendarSlice from './callendarSlice'
import eventSlice from './eventSlice'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        callendar: callendarSlice,
        event:eventSlice,
    }
})