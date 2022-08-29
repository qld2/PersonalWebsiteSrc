import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import 'antd/dist/antd.variable.css';
import './Main.css';

import Icon from '@ant-design/icons';

import Background from 'resources/Graph.mp4';
import useWindowDimensions, { Dimensions } from 'util/windowDimensions';
import { setDimensions } from 'reducer/applet/appletSlice';
import { AppState, AppDispatch } from 'src/Root'; // fix import resolution

import MenuBar from './MenuBar';
import Introduction from './pages/Introduction';
import Blog from './pages/Blog';
// import Broadcast from './displays/Broadcast';

const mapStateToProps = (state: AppState) => ({
  menuBarWidth: state.menuBar.width,
});

function mapDispatchToProps(dispatch : AppDispatch) {
  return {
    dispatch,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

function Main(props : Props) {
  const setAppletDimensions = (windowDimensions: Dimensions) => {
    const { dispatch, menuBarWidth } = props;

    dispatch(setDimensions({
      width: windowDimensions.width - menuBarWidth,
      height: windowDimensions.height,
    }));
  };

  const { width, height } = useWindowDimensions(setAppletDimensions);

  return (
    <div className="Main">
      <MenuBar />

      <div className="Card">

        <Switch>
          <Route path="/Introduction">
            <Introduction />
          </Route>
          <Route path="/Portfolio">
            <p>Portfolio</p>
          </Route>
          <Route path="/Blog">
            <p>Portfolio</p>
            {/* <Blog /> */}
          </Route>
          <Route path="/Contact">
            <p>Portfolio</p>
          </Route>
          <Route path="">
            <Redirect to="/Introduction" />
          </Route>
        </Switch>

        {/* <Broadcast message="I Like To Eat Apples and Bananas" /> */}
      </div>

      <video className="Video" autoPlay muted loop id="backgroundVideo">
        <source src={Background} type="video/mp4" />
      </video>
    </div>
  );
}

export default connector(Main);
