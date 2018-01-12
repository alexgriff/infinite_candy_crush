import React, { Component } from 'react';
import Candy from './Candy';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../Constants';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import * as actions from '../actions';


const cellTarget = {
  drop(props) {
    let {selected, index, candies, switchCandies} = props;

    switchCandies(selected, index, candies);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Cell extends Component {

  render() {
    const width = (BOARD_WIDTH * BOARD_HEIGHT) / BOARD_WIDTH
    const { connectDropTarget, candy, index, selectedNeighbors, matches } = this.props;


    return connectDropTarget(
      <div
        style={{
          flex: `1 0 ${width}%`,
          backgroundColor: selectedNeighbors.includes(index) ? `#F5F1DE` : null,
          backgroundColor: matches.includes(index) ? `#FFA1DE` : null
        }} >
        <Candy candy={candy} index={index} />
      </div>
    );
  }
}

const mapStateToProps = ({selected, candies, selectedNeighbors, matches}) => {
  return {
    selected,
    candies,
    selectedNeighbors,
    matches
  }
}


export default connect(mapStateToProps, actions)(DropTarget('candy', cellTarget, collect)(Cell));
