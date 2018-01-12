import {
  INIT_BOARD,
  SELECT_CANDY,
  SWITCH_CANDY,
  BAD_SWITCH,
  FIND_MATCHES
} from './types';

import { EMOJIS, BOARD_WIDTH, BOARD_HEIGHT } from '../Constants';

// Helpers
// =======

// randomEmoji
// -----------
const randomEmoji = () => {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
};

// edges and neighbors
// -------------------

const isEdge = index => {
  if (index % BOARD_WIDTH === 0) {
    return 'left';
  } else if (index % BOARD_WIDTH === BOARD_WIDTH - 1) {
    return 'right';
  } else {
    return false;
  }
};

const getNeighbors = index => {
  const edge = isEdge(index);
  const left = edge === 'left' ? null : index - 1;
  const right = edge === 'right' ? null : index + 1;
  const bottom =
    index >= BOARD_WIDTH * BOARD_HEIGHT - BOARD_WIDTH
      ? null
      : index + BOARD_WIDTH;
  const top = index < BOARD_WIDTH ? null : index - BOARD_WIDTH;

  return [left, right, top, bottom].filter(i => i !== null);
};

// matching logic
// --------------

const followDirection = (index, relation, candies, matches) => {
  if (
    getNeighbors(index).includes(index + relation) &&
    candies[index] === candies[index + relation]
  ) {
    matches.push(index + relation);
    return followDirection(index + relation, relation, candies, matches);
  } else {
    return matches.length > 2 ? matches : [];
  }
};

const neighborsToMatches = (neighborsMap, candies) => {
  let currentCandy, currentMatches, relation;

  return neighborsMap.map((neighbors, index) => {
    currentMatches = [];
    currentCandy = candies[index];

    neighbors.forEach(n => {
      if (candies[n] === currentCandy) {
        relation = n - index;

        followDirection(n, relation, candies, [index, n]).forEach(m =>
          currentMatches.push(m)
        );
      }
    });
    // mark as seen
    candies[index] = 'seen';
    return currentMatches;
  });
};

const buildMatchList = candies => {
  let neighborsMap = candies.map((candy, index) => getNeighbors(index));

  return neighborsToMatches(neighborsMap, candies.slice())
    .filter(m => m.length > 2)
    .reduce((a, b) => a.concat(b));
};

const isMatch = (selectedIndex, currentIndex, candies) => {
  let potentialBoard = candies.slice();
  potentialBoard[currentIndex] = candies[selectedIndex];
  potentialBoard[selectedIndex] = candies[currentIndex];
  return buildMatchList(potentialBoard).includes(currentIndex);
};

// ACTION CREATORS
// ===============

export function populateBoard() {
  const numCandies = BOARD_WIDTH * BOARD_HEIGHT;

  return {
    type: INIT_BOARD,
    payload: [...new Array(numCandies)].map(() => randomEmoji())
  };
}

export function selectCandy(selectedIndex) {
  return {
    type: SELECT_CANDY,
    payload: {
      selectedIndex,
      selectedNeighbors: getNeighbors(selectedIndex)
    }
  };
}

export function switchCandies(selectedIndex, currentIndex, candies) {
  if (
    getNeighbors(selectedIndex).includes(currentIndex) &&
    isMatch(selectedIndex, currentIndex, candies)
  ) {
    return { type: SWITCH_CANDY, payload: { selectedIndex, currentIndex } };
  } else {
    return { type: BAD_SWITCH };
  }
}

export function checkForMatches(candies) {
  return { type: FIND_MATCHES, payload: buildMatchList(candies) };
}
