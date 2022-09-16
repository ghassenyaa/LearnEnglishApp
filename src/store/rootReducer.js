import { combineReducers } from '@reduxjs/toolkit';
import { reducer as modalsReducer } from './../slices/modals';
import { reducer as snackbarReducer } from './../slices/snackbar';
import { reducer as filesReducer } from './../slices/files';
import { reducer as chapterReducer } from './../slices/chapters';
import { reducer as coursesReducer } from './../slices/courses';
import { reducer as levelsReducer } from './../slices/levels';
import { reducer as personsReducer } from './../slices/persons';
import { reducer as wordsReducer } from './../slices/words';
import { reducer as inputsReducer } from './../slices/inputs';
import { reducer as selectReducer } from './../slices/select';
import { reducer as discussionReducer } from './../slices/discussion';
import { reducer as questionblocktypeReducer } from './../slices/questionBlockTypes';
import { reducer as selectInputReducer } from './../slices/selectInput';
import { reducer as structureBuilderReducer } from './../slices/structureBuilder';
import { reducer as questionBlocksReducer } from './../slices/questionblocks';

import exercisesReducer from './../slices/exercises';
import usersReducer from './../slices/users';
import { reducer as modaladdUserReducer } from './../slices/modalsaddUser';
import { reducer as userReducer } from '../slices/user';
import languagesReducer from '../slices/languages';
const combinedReducer = combineReducers({
  modals: modalsReducer,
  snackbar: snackbarReducer,
  chapters: chapterReducer,
  words: wordsReducer,
  questionBlocks: questionBlocksReducer,
  select: selectReducer,
  structureBuilder: structureBuilderReducer,
  discussion: discussionReducer,
  courses: coursesReducer,
  inputs: inputsReducer,
  files: filesReducer,
  persons: personsReducer,
  selectinput: selectInputReducer,
  levels: levelsReducer,
  exercises: exercisesReducer,
  modaluser: modaladdUserReducer,
  users: usersReducer,
  user: userReducer,
  languages: languagesReducer,
  questionblocktype: questionblocktypeReducer,
});
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return combinedReducer(state, action);
};
export default rootReducer;
