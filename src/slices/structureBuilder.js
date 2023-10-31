import { createSlice, current } from '@reduxjs/toolkit';
const initialState = {
  title: '',
  questionBlockTypeId: '',
  exerciseId: '',
  courseId: '',
  order: 0,
  builder: [],
  questionBlocks: [],
  questionBlockswrapper: [],
  questionTitle: '',
  questionBlocksTipBlock: [],
  questionDragAndDrop: [],
  questionFillInTheBlanks: [],
  questionWriteInTheBlanks: [],
  questionOneCorrectChoise: [],
  questionTrueFalseBlock: [],
  questionTitleBlock: [],
  questionDescriptionBlock: [],
  questionTextBlock: [],
  questionBlockswrapper: [],
  blockId: '',
};
const slice = createSlice({
  name: 'structureBuilder',
  initialState,
  reducers: {
    getCourseId: (state, action) => {
      state.exerciseId = action.payload.exerciseId;
    },
    getExerciseId: (state, action) => {
      state.courseId = action.payload;
    },
    getquestionTitle: (state, action) => {
      state.questionTitle = action.payload.title;
    },
    saveBlocksData: (state, action) => {
      state.title = action.payload.title;
      state.questionBlockTypeId = action.payload.questionBlockTypeId;
      state.order = action.payload.order;
      state.persons = action.payload.persons;
      state.blockId = action.payload.blockId;
      if (state.blockId === 'conversationBlock') {
        state.questionBlocks.push({
          order: state.order,
          text1: action.payload.text,
          speeches: action.payload.speeches,
          questionBlockTypeId: state.questionBlockTypeId,
          persons: action.payload.persons,
        });
      }
      if (state.blockId === 'secondDialogblock') {
        state.questionBlocks.push({
          order: state.order,
          text1: action.payload.text,
          questionBlockTypeId: state.questionBlockTypeId,
          speeches2: action.payload.speeches2,
          persons: action.payload.persons,
        });
      }
      if (state.blockId === 'dialogBuilderBlock') {
        state.questionBlocks.push({
          order: state.order,
          text1: action.payload.text,
          questionBlockTypeId: state.questionBlockTypeId,
          speeches3: action.payload.speeches3,
          persons: action.payload.persons,
        });
      }
      if (state.blockId === 'tipBlock') {
        state.questionBlocks.push({
          order: state.order,
          questionBlockTypeId: state.questionBlockTypeId,
          text1: action.payload.text1,
          text2: action.payload.text2,
          wordList: action.payload.wordList,
        });
      }
      if (state.blockId === 'imageBlock') {
        state.questionBlocks.push({
          order: state.order,
          questionBlockTypeId: state.questionBlockTypeId,
          imageUrl: action.payload.imageUrl,
        });
      }
      if (state.blockId === 'audioBlock') {
        state.questionBlocks.push({
          order: state.order,
          questionBlockTypeId: state.questionBlockTypeId,
          audioUrl: action.payload.audioUrl,
        });
      }

      if (state.blockId === 'titleBlock') {
        state.questionBlocks.push({
          order: state.order,
          questionBlockTypeId: state.questionBlockTypeId,
          text1: action.payload.titleBlock,
        });
      }
      if (state.blockId === 'descriptionBlock') {
        state.questionBlocks.push({
          order: state.order,
          questionBlockTypeId: state.questionBlockTypeId,
          text1: action.payload.description,
        });
      }
      if (state.blockId === 'textBlock') {
        state.questionBlocks.push({
          order: state.order,
          questionBlockTypeId: state.questionBlockTypeId,
          text1: action.payload.textBlock,
        });
      }
      if (state.blockId === 'DragAndDropBlock') {
        state.questionBlocks.push({
          order: state.order,
          questionBlockTypeId: state.questionBlockTypeId,
          questions: action.payload.questionsDrag,
          answers: action.payload.answersDrag,
          correctAnswers: action.payload.correctAnswers,
        });
      }
      if (state.blockId === 'FillInTheBlanks') {
        state.questionBlocks.push({
          order: state.order,
          questionBlockTypeId: state.questionBlockTypeId,
          words: action.payload.words,
        });
      }
      if (state.blockId === 'WriteInTheBlanks') {
        state.questionBlocks.push({
          order: state.order,
          questionBlockTypeId: state.questionBlockTypeId,
          words: action.payload.words2,
        });
      }
      if (state.blockId === 'TrueFalseBlock') {
        state.questionBlocks.push({
          order: state.order,
          questionBlockTypeId: state.questionBlockTypeId,
          text1: action.payload.question,
          text2: action.payload.answer,
          answer: action.payload.trueAnswer,
        });
      }
      if (state.blockId === 'OneCorrectChoise') {
        state.questionBlocks.push({
          order: state.order,
          questionBlockTypeId: state.questionBlockTypeId,
          answers: action.payload.answers,
          correctAnswerId: action.payload.correctAnswerId,
        });
      }
      if (state.blockId === 'phraseBuilder') {
        state.questionBlocks.push({
          order: state.order,
          questionBlockTypeId: state.questionBlockTypeId,
          sentences: action.payload.sentences,
        });
      }
      state.builder.push({
        title: state.title,
        exerciceId: action.payload.exerciseId,
      });
      state.questionBlockswrapper = [...state.questionBlocks];
    },
  },
});
export const reducer = slice.reducer;
export const { saveBlocksData, getExerciseId, getquestionTitle, BlocksWrapper, getCourseId } =
  slice.actions;
export default slice;
