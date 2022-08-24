import React from 'react';
import 'antd/dist/antd.variable.css';
// import 'antd/dist/antd.css';
import './Main.css';

import Icon from '@ant-design/icons';
import VID from 'resources/Graph.mp4';
import { PageHeader, Menu, Button } from 'antd';
import MenuBar from './MenuBar';

type Props = {};

function Main(props : Props) {
  return (
    <div className="Main">
      <MenuBar />

      {/* <div className="Card">
        <p>HFJASKD</p>
      </div> */}

      <video className="Video" autoPlay muted loop id="backgroundVideo">
        <source src={VID} type="video/mp4" />
      </video>
    </div>
  );
}

export default Main;
