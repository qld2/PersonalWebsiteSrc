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

type Props = {
  width: number,
  height: number
};

type State = {
  canvasContext: CanvasRenderingContext2D | null,
};

class ParametricGrapher extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      canvasContext: null,
    };
  }

  render(): React.ReactNode {
    const { width, height } = this.props;

    const canvasWidth = Math.min(width, height) - 100;
    const canvasHeight = Math.min(width, height) - 100;

    return (
      <div
        className="ParametricGrapher"
        style={{ width, height }}
      >
        <ParametricGraph
          width={canvasWidth}
          height={canvasHeight}
          x={(time: number) => 95 * time}
          y={(time: number) => 10 * time}
        />
      </div>
    );
  }
}

export default ParametricGrapher;
