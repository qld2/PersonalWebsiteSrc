import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { push } from 'connected-react-router';

import 'antd/dist/antd.variable.css';
import './Introduction.css';

import type {
  AppState, AppDispatch,
} from 'src/Root';

import Shell from 'components/displays/Shell';
import IdPicture from 'components/displays/IdPicture';
import { MAX_WIDTH, MIN_WIDTH } from '../../../dimConstraints'; // ????
import IntroOne from './IntroOne.txt';
import Interests from './Interests.txt';
import lerp, { Point, vectorAdd } from '../../../util/lerp';
import { SIDEMENU_COLLAPSED_SIZE, SIDEMENU_EXPANDED_SIZE } from '../../MenuBar';

const mapStateToProps = (state: AppState) => ({
  width: state.applet.width,
  height: state.applet.height,
  menuWidth: state.menuBar.collapsed
    ? SIDEMENU_COLLAPSED_SIZE : SIDEMENU_EXPANDED_SIZE,
});

function mapDispatchToProps(dispatch : AppDispatch) {
  return {
    dispatch,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
};

type State = {
  counter: number,
  secondShellActive: boolean,
};

class Introduction extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      counter: 0,
      secondShellActive: false,
    };
  }

  activateSecondShell = () => {
    this.setState({
      secondShellActive: true,
    });
  };

  onDragOver = (e : any) => {
    e.preventDefault();
  };

  scale = () => {
    const { width, menuWidth } = this.props;

    const maxScale = 1;
    const minScale = 0.5;

    const pf:Point = { x: maxScale, y: 0 };
    const p0:Point = { x: minScale, y: 0 };

    return lerp(pf, p0, MAX_WIDTH - menuWidth, MIN_WIDTH - menuWidth, width);
  };

  uniformOffset = ():Point => {
    const { width, menuWidth } = this.props;

    if (width <= MAX_WIDTH - menuWidth) return { x: 0, y: 0 };

    return { x: (width - (MAX_WIDTH - menuWidth)) / 2, y: 0 };
  };

  shellOnePosition = ():Point => {
    const { width, menuWidth } = this.props;

    const pf:Point = { x: 65, y: 48 };
    const p0:Point = { x: 45, y: 114 };

    return lerp(pf, p0, MAX_WIDTH - menuWidth, MIN_WIDTH - menuWidth, width);
  };

  shellTwoPosition = ():Point => {
    const { width, menuWidth } = this.props;

    const pf:Point = { x: 156, y: 432 };
    const p0:Point = { x: 91, y: 331 };

    return lerp(pf, p0, MAX_WIDTH - menuWidth, MIN_WIDTH - menuWidth, width);
  };

  idPicPosition = ():Point => {
    const { width, menuWidth } = this.props;

    const pf:Point = { x: 543, y: 25 };
    const p0:Point = { x: 313, y: 105 };

    return lerp(pf, p0, MAX_WIDTH - menuWidth, MIN_WIDTH - menuWidth, width);
  };

  render(): React.ReactNode {
    const { width, height, menuWidth: absoluteMargin } = this.props;
    const { secondShellActive } = this.state;

    const messagesA = ['Hello Friend,', IntroOne];
    const messagesB = [Interests];

    const scale = this.scale().x;

    const shellOneScale = scale * 1;
    const shellTwoScale = scale * 1;

    const uniformOffset = this.uniformOffset();
    const shellOnePos = this.shellOnePosition();
    const shellTwoPos = this.shellTwoPosition();
    const idPicPos = this.idPicPosition();

    return (
      <div
        className="Introduction"
        style={{ width, height }}
        onDragOver={this.onDragOver}
      >
        <Shell
          aspectRatio={1}
          scaleMultiplier={shellOneScale}
          fontScaleMultiplier={shellOneScale}
          initialPos={vectorAdd(uniformOffset, shellOnePos)}
          commandName="Introduce"
          messages={messagesA}
          finishedCallback={this.activateSecondShell}
        />

        <Shell
          aspectRatio={0.5}
          scaleMultiplier={shellTwoScale}
          fontScaleMultiplier={shellTwoScale}
          initialPos={vectorAdd(uniformOffset, shellTwoPos)}
          commandName="Interests"
          messages={messagesB}
          active={secondShellActive}
        />

        <IdPicture
          scaleMultiplier={scale}
          initialPos={vectorAdd(uniformOffset, idPicPos)}
        />
      </div>
    );
  }
}

export default connector(Introduction);
