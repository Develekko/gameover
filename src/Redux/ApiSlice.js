import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getGames = createAsyncThunk('/all-games',async (Data)=>{
     const {path,cat} = Data
    let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?${cat}=${path}`, {
        headers: {
            'X-RapidAPI-Key': 'fc42eedff7msh1176cf883aee197p199b36jsn12e2a3062d67',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    })
    return data
})
let initialState = {allgames:[],loading:false}
let gameSlice =  createSlice({
    name:'movies',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getGames.fulfilled,(state,action)=>{
            state.allgames = action.payload
        });
        builder.addCase(getGames.pending,(state)=>{
            state.loading = true
        })
    }

})

export let gameReducer = gameSlice.reducer
