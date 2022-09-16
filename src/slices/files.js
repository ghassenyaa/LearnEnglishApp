import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  file: null,
  type: '',
  question: '',
  answer: '',
  correctChoise: [],
  correctanswerId: '0',
  correctChoise1: '',
  correctChoise2: '',
  correctChoise3: '',
  title: '',
  description: '',
  text: '',
  arrayWord: [],
  arrayWriteInTheBlanks: [],
  arrayfalseWord: [],
  questionsDrag: [],
  answersDrag: [],
  correctAnswers: [],
  speakerId: '',
  questionId: '',
  answerId: '',
  speakerId: '',
  text: '',
  text1: '',
  text2: '',
  imageUrl: '',
  audioUrl: '',
  textarray: [],
  filetype: '',
  trueAnswer: true,
};
const slice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    getText: (state, action) => {
      state.text = action.payload.text;
      state.textarray.push(action.payload);
    },
    getText1: (state, action) => {
      state.text1 = action.payload.text1;
    },
    getText2: (state, action) => {
      state.text2 = action.payload.text2;
    },
    getImage: (state, action) => {
      state.imageUrl = action.payload.img;
    },
    getAudio: (state, action) => {
      state.audioUrl = action.payload.audio;
    },
    saveFile: (state, action) => {
      state.file = action.payload.file;
      state.type = action.payload.type;
      state.speakerId = action.payload.speakerId;
      state.filetype = action.payload.filetype;
    },
    saveQuestion: (state, action) => {
      state.question = action.payload;
    },
    saveAnswer: (state, action) => {
      state.answer = action.payload;
    },
    savetruefalseblock: (state, action) => {
      //   state.truefalseblock.push(action.payload);
      state.question = action.payload.text1;
      state.answer = action.payload.text2;
      state.trueAnswer = action.payload.answer;
    },
    saveTitle: (state, action) => {
      state.title = action.payload;
    },
    saveDescription: (state, action) => {
      state.description = action.payload;
    },
    saveText: (state, action) => {
      state.text = action.payload;
    },
    saveCorrectChoise1: (state, action) => {
      state.correctChoise1 = action.payload;
    },
    saveCorrectChoise2: (state, action) => {
      state.correctChoise2 = action.payload;
    },
    saveCorrectChoise3: (state, action) => {
      state.correctChoise3 = action.payload;
    },
    savecorreactword: (state, action) => {
      state.arrayWord.push(action.payload);
    },
    saveWriteinTheBlanksWords: (state, action) => {
      state.arrayWriteInTheBlanks.push(action.payload);
    },
    saveQuestionDrag: (state, action) => {
      state.questionsDrag.push(action.payload);
      state.questionId = action.payload.id;
    },
    saveAnswersDrag: (state, action) => {
      state.answersDrag.push(action.payload);
      state.answerId = action.payload.id;
    },
    saveCorrectAnswers: (state, action) => {
      state.correctAnswers.push(action.payload);
    },
    saveTrueanswers: (state, action) => {
      state.trueAnswer = action.payload;
    },
    saveCorrectChoise: (state, action) => {
      state.correctChoise.push(action.payload);
    },
    saveCorrectAnswerId: (state, action) => {
      state.correctanswerId = action.payload;
    },
  },
});
export const reducer = slice.reducer;
export const {
  saveFile,
  saveQuestion,
  saveCorrectChoise1,
  saveCorrectChoise2,
  saveCorrectChoise3,
  saveTitle,
  saveDescription,
  saveText,
  savecorreactword,
  saveFalseword,
  saveQuestionDrag,
  saveAnswersDrag,
  getText,
  getImage,
  getAudio,
  saveCorrectAnswers,
  saveQuestionId,
  saveAnswerId,
  saveTrueanswers,
  saveCorrectChoise,
  saveCorrectAnswerId,
  getText1,
  getText2,
  saveAnswer,
  savetruefalseblock,
  saveWriteinTheBlanksWords,
} = slice.actions;

export default slice;
