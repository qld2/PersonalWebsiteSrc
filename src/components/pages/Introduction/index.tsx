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
import { SIDEMENU_COLLAPSED_SIZE, SIDEMENU_EXPANDED_SIZE } from 'components/MenuBar';
import IntroOne from './IntroOne.txt';
import Interests from './Interests.txt';
import {
  LayoutParams,
  scale,
  introductionPosition,
  shellThreePosition,
  professionalInterestsPosition,
  idPicPosition,
} from './layout';

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

  render(): React.ReactNode {
    const params:LayoutParams = this.props;
    const { width, height } = this.props;

    const { secondShellActive } = this.state;

    const messagesA = [['Hello Friend,'], [IntroOne]];
    const messagesB = [[Interests]];
    const messagesC = [['I am a:'], ['cowboy', 'astronaut', 'doctor', 'farmer']];

    return (
      <div
        className="Introduction"
        style={{ width, height }}
        onDragOver={this.onDragOver}
      >
        <Shell
          aspectRatio={1}
          scaleMultiplier={scale(params)}
          fontScaleMultiplier={scale(params)}
          initialPos={introductionPosition(params)}
          commandName="Introduce"
          messages={messagesA}
          finishedCallback={this.activateSecondShell}
        />

        <Shell
          aspectRatio={0.5}
          scaleMultiplier={scale(params)}
          fontScaleMultiplier={scale(params)}
          initialPos={professionalInterestsPosition(params)}
          commandName="ProffesionalInterests"
          messages={messagesB}
          active={secondShellActive}
        />

        <IdPicture
          scaleMultiplier={scale(params)}
          initialPos={idPicPosition(params)}
        />

        {/* <Shell
          aspectRatio={1}
          scaleMultiplier={scale}
          fontScaleMultiplier={scale}
          initialPos={shellThreePosition()}
          commandName="Interests"
          messages={messagesC}
        /> */}
      </div>
    );
  }
}

export default connector(Introduction);
