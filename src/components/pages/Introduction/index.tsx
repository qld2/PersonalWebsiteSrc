import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { push } from 'connected-react-router';

import 'antd/dist/antd.variable.css';
import './Introduction.css';

import type {
  AppState, AppDispatch,
} from 'src/Root';

import CommandShell from 'components/displays/Shell/CommandShell';
import InteractiveShell from 'components/displays/Shell/InteractiveShell';
import IdPicture from 'components/displays/IdPicture';
import { SIDEMENU_COLLAPSED_SIZE, SIDEMENU_EXPANDED_SIZE } from 'components/MenuBar';
import IntroOne from './IntroOne.txt';
import Interests from './Interests.txt';
import {
  LayoutParams,
  scale,
  introductionPosition,
  interestsPosition,
  professionalInterestsPosition,
  whoPosition,
  interactivePosition,
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
    const messagesC = [['I am a:'], ['Programmer', 'Mathematician',
      'Designer', 'Artist', 'Collaborator']];

    const messagesD = [['I enjoy:'], ['Programming', 'Music',
      'Snowboarding', 'Gaming', 'Yoga', 'Puzzles', 'Socializing',
      'Proofs', '']];

    return (
      <div
        className="Introduction"
        style={{ width, height }}
        onDragOver={this.onDragOver}
      >
        <CommandShell
          aspectRatio={1}
          scaleMultiplier={scale(params)}
          fontScaleMultiplier={scale(params)}
          initialPos={introductionPosition(params)}
          commandName="Introduce"
          messages={messagesA}
          finishedCallback={this.activateSecondShell}
        />

        <CommandShell
          aspectRatio={0.5}
          scaleMultiplier={scale(params)}
          fontScaleMultiplier={scale(params)}
          initialPos={professionalInterestsPosition(params)}
          commandName="ProfessionalInterests"
          messages={messagesB}
          active={secondShellActive}
        />

        <IdPicture
          scaleMultiplier={scale(params)}
          initialPos={idPicPosition(params)}
        />

        <CommandShell
          aspectRatio={0.6}
          scaleMultiplier={scale(params) * 0.6}
          fontScaleMultiplier={scale(params)}
          initialPos={whoPosition(params)}
          commandName="Who"
          messages={messagesC}
        />

        <CommandShell
          aspectRatio={0.6}
          scaleMultiplier={scale(params) * 0.6}
          fontScaleMultiplier={scale(params)}
          initialPos={interestsPosition(params)}
          commandName="Interests"
          messages={messagesD}
        />

        {/* <InteractiveShell
          aspectRatio={0.6}
          scaleMultiplier={scale(params) * 0.6}
          fontScaleMultiplier={scale(params)}
          initialPos={interactivePosition(params)}
        /> */}

      </div>
    );
  }
}

export default connector(Introduction);
