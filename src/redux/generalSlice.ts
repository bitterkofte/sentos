import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type SentencesType = {
  // id: number
  sentence: string
  createdAt: number
  fav: boolean
}

export interface GeneralStateType {
  value: number
  sentenceText: string
  sentences: SentencesType[]
}

const localSentences: [] = localStorage.getItem("sentences") ? JSON.parse(localStorage.getItem("sentences") as string) : [];

console.log('localSentences: ', localSentences)

const initialState: GeneralStateType = {
  value: 0,
  sentenceText: "",
  sentences: localSentences,
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    setSentenceText: (state, action: PayloadAction<string>) => {
      state.sentenceText = action.payload
    },
    setSentences: (state, action: PayloadAction<SentencesType>) => {
      // state.sentences = [...state.sentences, action.payload]
      state.sentences.push(action.payload)
      const storedValue = localStorage.getItem("sentences");
      console.log('storedValue: ', storedValue)
      if (storedValue) {
        const parsedValue = JSON.parse(storedValue)
        parsedValue.push(action.payload)
        localStorage.setItem("sentences", JSON.stringify(parsedValue));
      } else localStorage.setItem("sentences", JSON.stringify([action.payload]));
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  increment,
  decrement,
  incrementByAmount,
  setSentenceText,
  setSentences,
} = generalSlice.actions
export default generalSlice.reducer