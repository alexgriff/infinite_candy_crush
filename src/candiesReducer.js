import {
  INIT_BOARD,
  SELECT_CANDY,
  SWITCH_CANDY,
  BAD_SWITCH,
  FIND_MATCHES
} from './actions/types';

const defaultState = {
  candies: [],
  selected: null,
  selectedNeighbors: [],
  matches: []
};

export default (state = defaultState, action) => {
  // annoying issue
  // const { selectedIndex, currentIndex, selectedNeighbors } = action.payload;

  switch(action.type) {

    case INIT_BOARD:
      return {...state, candies: action.payload};

    case SELECT_CANDY:
      return {
        ...state,
        selected: action.payload.selectedIndex,
        selectedNeighbors: action.payload.selectedNeighbors
      };

    case SWITCH_CANDY:
      const switched = state.candies.slice();
      switched[action.payload.currentIndex] = state.candies[action.payload.selectedIndex]
      switched[action.payload.selectedIndex] = state.candies[action.payload.currentIndex];

      return {...state, candies: switched, selectedNeighbors: []}

    case BAD_SWITCH:
      return {...state, selectedNeighbors: []}

    case FIND_MATCHES:
      // console.log('matches', action.payload);
        // let candies =
        //   state.candies.map( (candy, i) => {
        //     if (action.payload.includes(i)) {
        //       return "X"
        //     } else {
        //       return candy
        //     }
        //   })
      // // console.log(matches);
      // if (updated) {
      //   candies
      // } else {
      //   state.candies
      // }
      return {...state, matches: action.payload}

    default:
      return state
  }
}
