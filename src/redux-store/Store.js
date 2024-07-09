import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice'
import contentSlice from './contentSlice'
import watchListSlice from './watchListSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        video: contentSlice,
        watchList: watchListSlice
    }
})