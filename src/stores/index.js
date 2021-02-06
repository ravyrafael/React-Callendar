import callendarSlice from './callendarSlice'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        callendar: callendarSlice
    }
})