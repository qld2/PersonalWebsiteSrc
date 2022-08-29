import React, { CSSProperties } from 'react';

import 'antd/dist/antd.variable.css';
import './Handle.css';

type Props = {
  className?: string;
  style?: CSSProperties;
  children: JSX.Element[];
  offSetCallback: (xOffset: number, yOffset: number) => void;
};

type State = {
  clientX: number,
  clientY: number,
  dragging: boolean,
};

class Handle extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
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
    const { offSetCallback } = this.props;
    const {
      clientX, clientY,
    } = this.state;
    e.preventDefault();

    offSetCallback(e.clientX - clientX, e.clientY - clientY);
    this.setState({
      clientX: e.clientX,
      clientY: e.clientY,
    });
  };

  handleDragEnd = (e: any) => {
    this.setState({
      dragging: false,
    });
  };

  render(): React.ReactNode {
    const {
      style, children, className,
    } = this.props;

    return (
      <div
        className={className}
        style={style}
        draggable
        onDragStart={this.handleDragStart}
        onDrag={this.handleDrag}
        onDragEnd={this.handleDragEnd}
      >
        { children }
      </div>
    );
  }
}

export default Handle;
