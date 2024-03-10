import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type SentencesType = {
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

// console.log('localSentences: ', localSentences)

const initialState: GeneralStateType = {
  value: 0,
  sentenceText: "",
  sentences: localSentences,
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSentenceText: (state, action: PayloadAction<string>) => {
      state.sentenceText = action.payload
    },
    setSentences: (state, action: PayloadAction<SentencesType>) => {
      // state.sentences = [...state.sentences, action.payload]
      state.sentences.push(action.payload)
      const storedValue = localStorage.getItem("sentences");
      // console.log('storedValue: ', storedValue)
      if (storedValue) {
        const parsedValue = JSON.parse(storedValue)
        parsedValue.push(action.payload)
        localStorage.setItem("sentences", JSON.stringify(parsedValue));
      } else localStorage.setItem("sentences", JSON.stringify([action.payload]));
    },
    makeSentences: (state, action: PayloadAction<SentencesType[]>) => {
      state.sentences = action.payload;
      localStorage.setItem("sentences", JSON.stringify(action.payload));
    },
    deleteSentence: (state, action: PayloadAction<number>) => {
      state.sentences = state.sentences.filter(s => s.createdAt !== action.payload)
      localStorage.setItem("sentences", JSON.stringify(state.sentences));
    },
    toggleFav: (state, action: PayloadAction<number>) => {
      const updatedData = state.sentences.map((item) => {
        if (item.createdAt === action.payload) return { ...item, fav: item.fav ? false : true };
        return item;
      });
      state.sentences = updatedData;
      localStorage.setItem("sentences", JSON.stringify(updatedData));
    },
  },
})

export const {
  setSentenceText,
  setSentences,
  makeSentences,
  deleteSentence,
  toggleFav,
} = generalSlice.actions
export default generalSlice.reducer