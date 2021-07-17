import { SET_LISTS, SET_ACTIVE_LIST_ID } from '../types';

const initialState = {
  lists: [],
  activeListId: '',
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTS:
      return {
        ...state,
        lists: action.payload,
      };
    case SET_ACTIVE_LIST_ID:
      return {
        ...state,
        activeListId: action.payload,
      };
    default:
      return state;
  }
};

export default listReducer;