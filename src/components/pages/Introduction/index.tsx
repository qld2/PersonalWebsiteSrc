import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { push } from 'connected-react-router';

import 'antd/dist/antd.variable.css';
import './Introduction.css';

import { Image } from 'antd';
import { TypeAnimation } from 'react-type-animation';

import { AppState, AppDispatch } from 'src/Root';

import ProfPicture from 'resources/ProfessionalPicture.jpeg';
import UIUCLogo from 'resources/UIUCLogo.png';
import Shell from 'components/displays/Shell';
import Draggable from 'components/containers/Draggable';
import IntroOne from './IntroOne.txt';
import Interests from './Interests.txt';

const mapStateToProps = (state: AppState) => ({
  width: state.applet.width,
  height: state.applet.height,
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
    const { width, height } = this.props;
    const { secondShellActive } = this.state;

    const messagesA = ['Hello Friend,', IntroOne];
    const messagesB = [Interests];

    return (
      <div
        className="Introduction"
        style={{ width, height }}
        onDragOver={this.onDragOver}
      >
        <Shell
          width={500}
          height={450}
          initialTop={100}
          initialLeft={400}
          commandName="Introduce"
          messages={messagesA}
          finishedCallback={this.activateSecondShell}
        />

        <Shell
          width={800}
          height={300}
          initialTop={550}
          initialLeft={550}
          commandName="Interests"
          messages={messagesB}
          active={secondShellActive}
        />

        <Draggable
          width="fit-contest"
          height="fit-content"
          initialTop={50}
          initialLeft={1200}
        >
          <div
            className="IntroductionID"
            // style={{
            //   position: 'absolute',
            //   top: 50,
            //   left: 1200,
            // }}
          >
            <img className="IntroductionPhoto" src={ProfPicture} alt="ProfessionalShot" width={250} />
            <img className="IntroductionLogo" src={UIUCLogo} alt="UIUC" width={200} />
          </div>
        </Draggable>

      </div>
    );
  }
}

export default connector(Introduction);
