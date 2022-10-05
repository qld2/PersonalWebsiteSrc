import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

import 'antd/dist/antd.variable.css';
import './ParametricGrapher.css';

import { AppState, AppDispatch } from 'src/Root';
import {
  Button, Input, InputNumber, Menu, Spin,
} from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import ParametricGraph from './ParametricGraph';
import ParametricInterface from './ParametricInterface';

type Props = {
  width: number,
  height: number
};

type State = {
  time: number,
  canvasContext: CanvasRenderingContext2D | null,
  x: (t: number) => number,
  y: (t: number) => number,
};

class ParametricGrapher extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      time: 0,
      canvasContext: null,
      x: (t: number) => 0,
      y: (t: number) => 0,
    };
  }

  playAnimation = () => {
    const duration = 2000;
    const intervals = 500;
    const intervalDelta = 1 / intervals;

    this.setState({
      time: 0,
    });

    const tick = (left: number) => {
      this.setState({
        time: (intervals - left) * intervalDelta,
      });

      if (left > 1) setTimeout(() => tick(left - 1), duration / intervals);
    };

    tick(intervals);
  };

  clear = () => {};

  setEquations = (x: (t:number) => number, y: (t:number) => number) => {
    this.setState({
      x,
      y,
    });
  };

  render(): React.ReactNode {
    const { width, height } = this.props;
    const { time, x, y } = this.state;
    const margin = 50;

    const canvasLength = Math.min(width, height) - 2 * margin;

    return (
      <div
        className="ParametricGrapher"
        style={{ width, height }}
      >
        <ParametricGraph
          width={canvasLength}
          height={canvasLength}
          margin={margin}
          x={x}
          y={y}
          timeStart={0}
          timeEnd={time}
        />
        <ParametricInterface
          width={width - canvasLength - 3 * margin}
          height={canvasLength}
          margin={margin}
          playAnimation={this.playAnimation}
          setEquations={this.setEquations}
        />

      </div>
    );
  }
}

export default ParametricGrapher;
