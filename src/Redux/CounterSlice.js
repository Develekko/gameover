import { createSlice } from "@reduxjs/toolkit";

let counterSlice = createSlice({
    name:'counter',
    initialState:{counter:20},
    reducers:{
        increamnetByAmount:(state,action)=>{
            state.counter +=action.payload
        },
        resetCount:(state)=>{
            state.counter = 20
        },
        onTop:()=>{
            window.scrollTo(0,0);
        }
    }
});


export let counterReducer = counterSlice.reducer

export let {increamnetByAmount,resetCount,onTop} = counterSlice.actions
