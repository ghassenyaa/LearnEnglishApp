import { createSlice, current } from '@reduxjs/toolkit';
const initialState = {
  speeches: [],
  speeches2: [],
  words: [],
  speeches3: [],
  wordList: [],
  sentences: [],
  selected: false,
};
const slice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    selectedstate: (state, action) => {
      state.selected = action.payload.selected;
    },
    saveTipBlockWords: (state, action) => {
      state.wordList.push(action.payload);
    },
    savespeeches2: (state, action) => {
      state.speeches2.push({
        personId: action.payload.personId,
        position: action.payload.position,
        content: action.payload.content,
        isHidden: action.payload.isHidden,
      });
    },
    savespeeches3: (state, action) => {
      state.speeches3.push({
        personId: action.payload.personId,
        position: action.payload.position,
        content: action.payload.content,
      });
    },
    saveSentences: (state, action) => {
      state.sentences.push(action.payload);
    },
    savespeeches: (state, action) => {
      const foundIndex = state.speeches.findIndex((x) => x.personId == action.payload.personId);
      if (foundIndex > -1 && state.selected === false) {
        state.words.push(action.payload.words);
        state.speeches[state.speeches.length - 1].words = state.words;
        state.selected = false;
      } else if (state.selected && foundIndex > -1) {
        state.words.push(action.payload.words);
        state.speeches.push({
          personId: action.payload.personId,
          position: action.payload.position,
          words: state.words,
          audioUrl: action.payload.audioUrl,
        });
        state.selected = false;
      } else {
        if (state.selected && foundIndex <= -1) {
          state.words.push(action.payload.words);
          state.speeches.push({
            personId: action.payload.personId,
            position: action.payload.position,
            words: state.words,
            audioUrl: action.payload.audioUrl,
          });
        }
        state.selected = false;
      }
    },
    savewords: (state, action) => {
      state.words.push(action.payload);
    },

    emptyarray: (state, action) => {
      state.words = [];
    },
  },
});
export const reducer = slice.reducer;
export const {
  savespeeches,
  deleteword,
  saveTipBlockWords,
  emptyarray,
  savewords,
  selectedstate,
  savespeeches2,
  savespeeches3,
  saveSentences,
} = slice.actions;
export default slice;
