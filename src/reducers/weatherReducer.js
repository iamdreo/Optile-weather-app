import { FETCH_WEATHER } from '../actions/types';

const initialState = {
  items: [],
};

export default function(state = initialState, action) {
  if (action.type === FETCH_WEATHER) {
    return {
      ...state,
      items: action.payload,
    };
  }
  return state;
}
