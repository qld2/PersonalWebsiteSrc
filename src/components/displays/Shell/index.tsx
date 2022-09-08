import React, { useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import 'antd/dist/antd.variable.css';
import './Shell.css';

import { TypeAnimation } from 'react-type-animation';

import { AppState, AppDispatch } from 'src/Root';

import Handle from 'components/containers/Handle';
import cmdIcon from './cmdIcon.png';
import xIcon from './xIcon.png';
import { Point } from '../../../util/lerp';

declare type Speed = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99;

type Props = {
  className?: string;
  style?: React.CSSProperties;

  aspectRatio: number;
  scaleMultiplier: number;
  fontScaleMultiplier: number;

  initialPos: Point;
  // initialTop: number;
  // initialLeft: number;

  commandName?: string;
  messages?: string[][];

  active?: boolean;
  finishedCallback?: (none: void) => void;
};

type State = {
  counter: number,
  xOffset: number,
  yOffset: number,
};

class Shell extends React.Component<Props, State> {
  public static defaultProps = {
    active: true,
  };

  constructor(props : Props) {
    super(props);

    this.state = {
      counter: 0,
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

  getAnimation = (params: { texts: string[], speed?: number, callback?: boolean }
  = { texts: [], speed: 60, callback: false }) => {
    const { counter } = this.state;
    const { finishedCallback, fontScaleMultiplier } = this.props;

    const fontSize = 25 * fontScaleMultiplier;

    const arr:(string | number)[] = [];
    params.texts.forEach((text) => {
      arr.push(text);
      arr.push(500);
    });

    return (
      <div style={{ fontSize, fontFamily: 'Courier New', color: 'rgb(0, 255, 0)' }}>
        <TypeAnimation
          sequence={[
            // params.text,
            // 500,
            ...arr,
            () => {
              this.setState({
                counter: counter + 1,
              });

              if (params.callback && finishedCallback) finishedCallback();
            },
          ]}
          cursor={false}
          speed={params.speed as Speed}
        />
      </div>

    );
  };

  getAllAnimations = (): JSX.Element[] => {
    const { counter } = this.state;
    const {
      messages, commandName, active, fontScaleMultiplier,
    } = this.props;

    const fontSize = 25 * fontScaleMultiplier;

    if (!messages) return ([<div />]);

    const result: JSX.Element[] = [];

    if (commandName) {
      result.push(
        <div className="ShellCommand" style={{ fontSize }}>
          <div className="ShellPrompt" style={{ fontSize }}>root@PC:~$</div>
          {active ? this.getAnimation({ texts: [`./${commandName}`], speed: 30 }) : <div />}
        </div>,
        <p />,
      );
    }

    for (let i:number = 0; i < messages.length; i += 1) {
      if (counter > i && active) {
        if (i === messages.length - 1) result.push(this.getAnimation({ texts: messages[i], callback: true, speed: 90 }));
        else result.push(this.getAnimation({ texts: messages[i], speed: 90 }));
        result.push(<p />);
      }
    }

    return result;
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
    const {
      aspectRatio, scaleMultiplier,
    } = this.props;

    const { initialPos } = this.props;

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

        <div className="ShellWindow">
          <div className="ShellText">
            {this.getAllAnimations()}
          </div>
        </div>

      </div>
    );
  }
}

export default Shell;
