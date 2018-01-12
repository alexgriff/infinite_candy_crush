import React, { Component } from 'react';
import Cell from './Cell';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Board extends Component {

  componentDidMount() {
    this.props.populateBoard();
  }

  shouldComponentUpdate(nextProps) {
    return true;
  }

  componentDidUpdate() {
    this.props.checkForMatches(this.props.candies);
  }

  renderCells() {
    const { candies } = this.props;

    if (candies.length) {
      return candies.map((candy, i) => {
        return <Cell candy={candy} index={i} key={i} />
      })
    }
  }

  render() {
    return (
      <div
        className="Board"
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          width: '50%',
          margin: '0 auto'
        }} >
        {this.renderCells()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    candies: state.candies
  }
};

export default connect(mapStateToProps, actions)(DragDropContext(HTML5Backend)(Board));
