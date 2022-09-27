import React from 'react';

import 'antd/dist/antd.variable.css';
import './CommandShell.css';

import { TypeAnimation } from 'react-type-animation';
import { Point } from 'util/lerp';
import ShellOutline from '../ShellOutline';

declare type Speed = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99;

type Props = {
  aspectRatio: number;
  scaleMultiplier: number;
  fontScaleMultiplier: number;
  initialPos: Point;

  commandName?: string;
  messages: string[][];
  active?: boolean;
  finishedCallback?: (none: void) => void;
  repeat?: boolean;
};

type State = {
  counter: number,
};

class CommandShell extends React.Component<Props, State> {
  public static defaultProps = {
    active: true,
    repeat: false,
  };

  constructor(props : Props) {
    super(props);

    this.state = {
      counter: 0,
    };
  }

  getAnimation = (params: { texts: string[], speed?: number, callback?: boolean }
  = { texts: [], speed: 60, callback: false }) => {
    const { counter } = this.state;
    const { finishedCallback, fontScaleMultiplier, repeat } = this.props;

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
        <div className="CommandShellCommand" style={{ fontSize }}>
          <div className="CommandShellPrompt" style={{ fontSize }}>root@PC:~$</div>
          {active ? this.getAnimation({ texts: [`./${commandName}`], speed: 30 }) : <div />}
        </div>,
        <p />,
      );
    }

    for (let i:number = 0; i < messages.length; i += 1) {
      if (i < counter && active) {
        if (i === messages.length - 1) result.push(this.getAnimation({ texts: messages[i], callback: true, speed: 90 }));
        else result.push(this.getAnimation({ texts: messages[i], speed: 90 }));
        result.push(<p />);
      }
    }

    return result;
  };

  render(): React.ReactNode {
    const {
      aspectRatio,
      scaleMultiplier,
      fontScaleMultiplier,
      initialPos,
    } = this.props;

    return (
      <ShellOutline
        aspectRatio={aspectRatio}
        scaleMultiplier={scaleMultiplier}
        fontScaleMultiplier={fontScaleMultiplier}
        initialPos={initialPos}
      >
        <div className="CommandShellWindow">
          <div className="CommandShellText">
            {this.getAllAnimations()}
          </div>
        </div>

      </ShellOutline>
    );
  }
}

export default CommandShell;
