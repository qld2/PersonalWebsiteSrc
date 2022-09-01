import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import 'antd/dist/antd.variable.css';
import './IdPicture.css';

import ProfPicture from 'resources/ProfessionalPicture.jpeg';
import UIUCLogo from 'resources/UIUCLogo.png';
import Draggable from 'components/containers/Draggable';
import { Point } from '../../../util/lerp';

type Props = {
  scaleMultiplier: number;
  initialPos: Point;
};

function IdPicture(props: Props) {
  const {
    scaleMultiplier: sizeMultiplier,
    initialPos,
  } = props;

  const photoWidth = 250 * sizeMultiplier;
  const titleWidth = 200 * sizeMultiplier;
  const frameWidth = 300 * sizeMultiplier;
  const margin = 25 * sizeMultiplier;

  return (
    <Draggable
      width="fit-content"
      height="fit-content"
      initialLeft={initialPos.x}
      initialTop={initialPos.y}
    >
      <div
        className="IdPicture"
        style={{ width: frameWidth }}
      >
        <img style={{ marginTop: margin, marginBottom: margin }} src={ProfPicture} alt="ProfessionalShot" width={photoWidth} />
        <img style={{ marginBottom: margin }} className="IntroductionLogo" src={UIUCLogo} alt="Title" width={titleWidth} />
      </div>
    </Draggable>
  );
}

export default IdPicture;
