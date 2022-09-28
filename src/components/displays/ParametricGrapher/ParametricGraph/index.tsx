import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

import 'antd/dist/antd.variable.css';
import './ParametricGraph.css';

import { AppState, AppDispatch } from 'src/Root';
import {
  Button, Input, InputNumber, Menu, Spin,
} from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

type Props = {
  width: number,
  height: number
  x: (time:number) => number,
  y: (time:number) => number
};

type State = {
  canvasElement: HTMLCanvasElement | null,
};

class ParametricGraph extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      canvasElement: null,
    };
  }

  componentDidMount(): void {
    const canvasElement = (document.getElementById('parametricCanvas') as HTMLCanvasElement);
    this.setState({
      canvasElement,
    });

    const canvasContext = canvasElement?.getContext('2d');

    const { width, height } = this.props;
    const { x, y } = this.props;

    if (canvasContext) {
      canvasContext.moveTo(0, width / 2);
      canvasContext.lineTo(height, width / 2);
      canvasContext.moveTo(height / 2, 0);
      canvasContext.lineTo(height / 2, width);

      const intervals = 2;

      for (let i = 0; i < intervals; i += 1) {
        const t0 = i / (intervals - 1);
        const t1 = (i + 1) / (intervals - 1);

        canvasContext.moveTo(x(t0) + width / 2, y(t0) + height / 2);
        canvasContext.lineTo(x(t1) + width / 2, y(t1) + height / 2);
      }
      canvasContext.stroke();
    }

    // this.drawGraph(4);
  }

  drawGraph = (intervals: number) => {
    const { x, y } = this.props;
    const { canvasElement } = this.state;

    for (let i = 0; i < intervals; i += 1) {
      const t0 = i / (intervals - 1);
      const t1 = (i + 1) / (intervals - 1);

      const canvasContext = canvasElement?.getContext('2d');
      console.log(canvasElement);

      if (canvasContext) {
        console.log(t0, t1);
        canvasContext.moveTo(x(t0), y(t0));
        canvasContext.lineTo(x(t1), y(t1));
        canvasContext.stroke();
      }
    }
  };

  render(): React.ReactNode {
    const { width, height } = this.props;

    return (
      <div
        className="ParametricGraph"
        style={{ width, height }}
      >
        {/* <div className="ParametricGraphAnchor">
          <div
            className="ParametricGraphOverlay"
            style={{ width, height }}
          />
        </div> */}
        <canvas id="parametricCanvas" width={width} height={height} />
      </div>
    );
  }
}

export default ParametricGraph;
