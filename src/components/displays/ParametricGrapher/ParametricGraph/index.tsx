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
import lerp from 'util/lerp';

type Props = {
  width: number,
  height: number,
  margin: number,
  x: (time:number) => number,
  y: (time:number) => number,
  timeStart: number,
  timeEnd: number,
};

type State = {
  timeEnd: number,
};

class ParametricGraph extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      timeEnd: props.timeEnd,
    };
  }

  componentDidMount(): void {
    this.drawGraph(500);
  }

  static getDerivedStateFromProps({ timeEnd }: Props): State {
    return { timeEnd };
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    this.drawGraph(500);
  }

  drawGraph = (intervals: number) => {
    const {
      x, y, width, height, timeStart,
    } = this.props;

    console.log(x, y);

    const { timeEnd } = this.state;

    const canvasElement = (document.getElementById('parametricCanvas') as HTMLCanvasElement);
    const canvasContext = canvasElement?.getContext('2d');

    if (canvasContext) {
      canvasContext.clearRect(0, 0, width, height);
      canvasContext.beginPath();
      canvasContext.moveTo(0, width / 2);
      canvasContext.lineTo(height, width / 2);
      canvasContext.moveTo(height / 2, 0);
      canvasContext.lineTo(height / 2, width);

      for (let i = 0; i < intervals - 1; i += 1) {
        const it0 = i / (intervals - 1);
        const it1 = (i + 1) / (intervals - 1);
        // const t0 = Math.max(it0, timeStart);
        // const t1 = Math.min(it1, timeEnd);

        if (it0 > timeStart && it1 < timeEnd) {
          canvasContext.moveTo(x(it0) + width / 2, y(it0) + height / 2);
          canvasContext.lineTo(x(it1) + width / 2, y(it1) + height / 2);
        }
      }
      canvasContext.stroke();
    }
  };

  render(): React.ReactNode {
    const { width, height, margin } = this.props;

    return (
      <div
        className="ParametricGraph"
        style={{ width, height, margin }}
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
