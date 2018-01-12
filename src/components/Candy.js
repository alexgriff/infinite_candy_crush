import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './Candy.css'

class Candy extends Component {

  render() {;
    const { connectDragSource, isDragging } = this.props;

    return connectDragSource(
        <div
          style={{
          fontSize: '48px',
          width: '100%',
          height: '100%',
          opacity: isDragging ? 0.5 : 1
        }} >
          {this.props.candy}
        </div>
    );
  }
}

Candy.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};


const candySource = {
  beginDrag: (props) => {
    props.selectCandy(props.index);
    return {candy: props.candy};
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default connect(null, actions)(DragSource('candy', candySource, collect)(Candy));
