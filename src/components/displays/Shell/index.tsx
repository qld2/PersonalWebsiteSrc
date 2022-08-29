import React, { useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import 'antd/dist/antd.variable.css';
import './Shell.css';

import { Speed, TypeAnimation } from 'react-type-animation';

import { AppState, AppDispatch } from 'src/Root';

import Handle from 'components/containers/Handle';
import cmdIcon from './cmdIcon.png';
import xIcon from './xIcon.png';

type Props = {
  className?: string;
  style?: React.CSSProperties;

  width: string | number;
  height: string | number;
  initialTop: number;
  initialLeft: number;

  commandName?: string;
  messages?: string[];

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

    const { initialLeft, initialTop } = this.props;

    this.state = {
      counter: 0,
      xOffset: initialLeft,
      yOffset: initialTop,
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

  getAnimation = (params: { text: string, speed?: number, callback?: boolean }
  = { text: '', speed: 60, callback: false }) => {
    const { counter } = this.state;
    const { finishedCallback } = this.props;

    return (
      <TypeAnimation
        sequence={[
          params.text,
          500,
          () => {
            this.setState({
              counter: counter + 1,
            });

            if (params.callback && finishedCallback) finishedCallback();
          },
        ]}
        cursor={false}
        style={{ fontSize: '2em', fontFamily: 'Courier New', color: 'rgb(0, 255, 0)' }}
        // className="ShellPrompt"
        speed={params.speed as Speed}
      />
    );
  };

  getAllAnimations = (): JSX.Element[] => {
    const { counter } = this.state;
    const { messages, commandName, active } = this.props;

    if (!messages) return ([<div />]);

    const result: JSX.Element[] = [];

    if (commandName) {
      result.push(
        <div className="ShellCommand">
          <div className="ShellPrompt">root@PC:~$</div>
          {active ? this.getAnimation({ text: `./${commandName}`, speed: 30 }) : <div />}
        </div>,
        <p />,
      );
    }

    for (let i:number = 0; i < messages.length; i += 1) {
      if (counter > i && active) {
        if (i === messages.length - 1) result.push(this.getAnimation({ text: messages[i], callback: true, speed: 90 }));
        else result.push(this.getAnimation({ text: messages[i], speed: 90 }));
        result.push(<p />);
      }
    }

    return result;
  };

  render(): React.ReactNode {
    const {
      width, height,
    } = this.props;

    const { xOffset, yOffset } = this.state;

    return (
      <div
        className="Shell"
        style={{
          width,
          height,
          position: 'absolute',
          left: xOffset,
          top: yOffset,
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

        <div className="ShellText">
          {this.getAllAnimations()}
        </div>

      </div>
    );
  }
}

export default Shell;

// import React from 'react';
// import { connect, ConnectedProps } from 'react-redux';

// import 'antd/dist/antd.variable.css';
// import './Shell.css';

// import { Speed, TypeAnimation } from 'react-type-animation';

// import { AppState, AppDispatch } from 'src/Root';

// import cmdIcon from './cmdIcon.png';
// import xIcon from './xIcon.png';

// const mapStateToProps = (state: AppState) => ({});

// function mapDispatchToProps(dispatch : AppDispatch) {
//   return {
//     dispatch,
//   };
// }

// const connector = connect(mapStateToProps, mapDispatchToProps);
// type PropsFromRedux = ConnectedProps<typeof connector>;

// type Props = PropsFromRedux & {
//   className?: string;
//   style?: React.CSSProperties;

//   width: string | number;
//   height: string | number;
//   initialTop: number;
//   initialLeft: number;

//   commandName?: string;
//   messages?: string[];
// };

// type State = {
//   counter: number,
//   xOffset: number,
//   yOffset: number,
//   clientX: number,
//   clientY: number,
//   dragging: boolean,
// };

// class Shell extends React.Component<Props, State> {
//   constructor(props : Props) {
//     super(props);

//     const { initialLeft, initialTop } = this.props;

//     this.state = {
//       counter: 0,
//       xOffset: initialLeft,
//       yOffset: initialTop,
//       clientX: 0,
//       clientY: 0,
//       dragging: false,
//     };
//   }

//   handleDragStart = (e: any) => {
//     this.setState({
//       clientX: e.clientX,
//       clientY: e.clientY,
//       dragging: true,
//     });
//   };

//   handleDrag = (e: any) => {
//     const {
//       clientX, clientY, xOffset, yOffset,
//     } = this.state;
//     e.preventDefault();

//     this.setState({
//       xOffset: xOffset + e.clientX - clientX,
//       yOffset: yOffset + e.clientY - clientY,
//       clientX: e.clientX,
//       clientY: e.clientY,
//     });
//   };

//   handleDragEnd = (e: any) => {
//     const { clientX, clientY } = this.state;

//     this.setState({
//       dragging: false,
//     });
//   };

//   handleMouseDown = (e: any) => {
//     e.preventDefault();
//     document.body.style.cursor = 'grabbing';
//   };

//   getAnimation = (text: string, speed?: number) => {
//     const { counter } = this.state;

//     return (
//       <TypeAnimation
//         sequence={[
//           text,
//           1000,
//           () => {
//             this.setState({
//               counter: counter + 1,
//             });
//           },
//         ]}
//         cursor={false}
//         style={{ fontSize: '2em', fontFamily: 'Courier New', color: 'rgb(0, 255, 0)' }}
//         speed={speed ? speed as Speed : 60}
//       />
//     );
//   };

//   getAllAnimations = (): JSX.Element[] => {
//     const { counter } = this.state;
//     const { messages, commandName } = this.props;

//     if (!messages) return ([<div />]);

//     const result: JSX.Element[] = [
//       this.getAnimation(`root@PC:~$ ./${commandName}`, 80),
//       <p />,
//     ];

//     for (let i:number = 0; i < messages.length; i += 1) {
//       if (counter > i) {
//         result.push(this.getAnimation(messages[i]));
//         result.push(<p />);
//       }
//     }

//     return result;
//   };

//   render(): React.ReactNode {
//     const {
//       width, height, className, style,
//     } = this.props;

//     const { xOffset, yOffset, dragging } = this.state;

//     return (
//       <div
//         // draggable
//         style={{
//           width,
//           height,
//           position: 'absolute',
//           left: xOffset,
//           top: yOffset,
//           // userSelect: 'none',
//         }}
//       >
//         <div className="Shell" style={{ width, height }}>
//           <div
//             className="ShellHeader"
//             draggable
//             onDragStart={this.handleDragStart}
//             onDrag={this.handleDrag}
//             onDragEnd={this.handleDragEnd}
//             style={dragging ? { cursor: 'crosshair' } : { cursor: 'grab' }}
//           >
//             <img src={cmdIcon} alt="" height={30} />
//             <>cmd</>
//             <img className="ShellX" src={xIcon} alt="" height={20} />
//           </div>
//           <div className="ShellText">
//             {this.getAllAnimations()}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default connector(Shell);
