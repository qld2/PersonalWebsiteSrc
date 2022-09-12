import React from 'react';

import 'antd/dist/antd.variable.css';
import './Shell.css';

import Handle from 'components/containers/Handle';
import { Point } from 'util/lerp';
import cmdIcon from './cmdIcon.png';
import xIcon from './xIcon.png';

type Props = {
  children: JSX.Element;
  aspectRatio: number;
  scaleMultiplier: number;
  fontScaleMultiplier: number;
  initialPos: Point;
};

type State = {
  xOffset: number,
  yOffset: number,
};

class ShellOutline extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      xOffset: 0,
      yOffset: 0,
    };
  }

  addToOffsets = (xDelta:number, yDelta:number) => {
    const {
      xOffset, yOffset,
    } = this.state;

    this.setState({
      xOffset: xOffset + xDelta,
      yOffset: yOffset + yDelta,
    });
  };

  getDimensions = ():{ width: number, height: number } => {
    const {
      aspectRatio, scaleMultiplier,
    } = this.props;

    const area = 200000 * scaleMultiplier * scaleMultiplier;

    const width = Math.sqrt(area / aspectRatio);
    const height = aspectRatio * width;

    return { width, height };
  };

  render(): React.ReactNode {
    const { initialPos, children } = this.props;
    const { xOffset, yOffset } = this.state;

    const { width, height } = this.getDimensions();

    return (
      <div
        className="Shell"
        style={{
          width,
          height,
          position: 'fixed',
          left: initialPos.x + xOffset,
          top: initialPos.y + yOffset,
        }}
      >
        <Handle
          className="ShellHeader"
          style={{ cursor: 'grab' }}
          offSetCallback={this.addToOffsets}
        >
          <img src={cmdIcon} alt="" height={30} />
          <>cmd</>
          <img className="ShellX" src={xIcon} alt="" height={20} />
        </Handle>
        { children }
      </div>
    );
  }
}

export default ShellOutline;
