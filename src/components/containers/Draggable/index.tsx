import React from 'react';

import 'antd/dist/antd.variable.css';
import './Draggable.css';

type Props = {
  children: JSX.Element;
  width: string | number;
  height: string | number;
  initialTop: number;
  initialLeft: number;
};

type State = {
  xOffset: number,
  yOffset: number,
  clientX: number,
  clientY: number,
  dragging: boolean,
};

class Draggable extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    const { initialLeft, initialTop } = this.props;

    this.state = {
      xOffset: initialLeft,
      yOffset: initialTop,
      clientX: 0,
      clientY: 0,
      dragging: false,
    };
  }

  handleDragStart = (e: any) => {
    this.setState({
      clientX: e.clientX,
      clientY: e.clientY,
      dragging: true,
    });
  };

  handleDrag = (e: any) => {
    const {
      clientX, clientY, xOffset, yOffset,
    } = this.state;
    e.preventDefault();

    this.setState({
      xOffset: xOffset + e.clientX - clientX,
      yOffset: yOffset + e.clientY - clientY,
      clientX: e.clientX,
      clientY: e.clientY,
    });
  };

  handleDragEnd = (e: any) => {
    this.setState({
      dragging: false,
    });
  };

  handleMouseDown = (e: any) => {
    e.preventDefault();
    document.body.style.cursor = 'grabbing';
  };

  render(): React.ReactNode {
    const {
      width, height, children,
    } = this.props;

    const {
      xOffset, yOffset,
    } = this.state;

    return (
      <div
        draggable
        style={{
          width,
          height,
          position: 'absolute',
          left: xOffset,
          top: yOffset,
        }}
        onDragStart={this.handleDragStart}
        onDrag={this.handleDrag}
        onDragEnd={this.handleDragEnd}
      >
        { children }
      </div>
    );
  }
}

export default Draggable;
