import {configureStore} from '@reduxjs/toolkit'
import { gameReducer } from './ApiSlice'
import { counterReducer } from './CounterSlice'
let store =  configureStore({
    reducer:{
        counter:counterReducer,
        game:gameReducer
    }
})
export default store
 