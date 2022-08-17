import React from 'react';
import 'antd/dist/antd.css';
import './Main.css';

import Icon from '@ant-design/icons';
import SVG from 'resources/hat.svg';
import VID from 'resources/Fall.mp4';

type Props = {};

function Main(props : Props) {
  return (
    <div className="Main">
      <video className="Video" autoPlay muted loop id="backgroundVideo">
        <source src={VID} type="video/mp4" />
      </video>
      {/* <Icon component={SVG} /> */}
    </div>
  );
}

export default Main;
