import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import 'antd/dist/antd.variable.css';
import './Main.css';

import Background from 'resources/Graph.mp4';
import { AppState, AppDispatch } from 'src/Root';

import { MIN_WIDTH, MIN_HEIGHT } from 'util/dimConstraints';
import { setDimensions } from 'reducer/applet/appletSlice';
import { setCollapsed } from 'reducer/menuBar/menuBarSlice';
import MenuBar, { SIDEMENU_COLLAPSED_SIZE, SIDEMENU_EXPANDED_SIZE } from './MenuBar';
import Introduction from './pages/Introduction';
import Blog from './pages/Blog';

const mapStateToProps = (state: AppState) => ({
  menuBarWidth: state.menuBar.collapsed
    ? SIDEMENU_COLLAPSED_SIZE : SIDEMENU_EXPANDED_SIZE,
  desireCollapsed: state.menuBar.desireCollapsed,
  test: state.blog.test,
});

function mapDispatchToProps(dispatch : AppDispatch) {
  return {
    dispatch,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

type State = {
  width: number,
  height: number,
};

class Main extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      width: window.innerHeight < MIN_HEIGHT ? window.innerWidth - 10 : window.innerWidth,
      height: window.innerHeight < MIN_HEIGHT ? MIN_HEIGHT : window.innerHeight,
    };

    this.updateDimensions(
      window.innerHeight < MIN_HEIGHT ? window.innerWidth - 10 : window.innerWidth,
      window.innerHeight < MIN_HEIGHT ? MIN_HEIGHT : window.innerHeight,
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.setAppletDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setAppletDimensions);
  }

  setAppletDimensions = (e: Event | null):any => {
    if (e === null) return;
    const target = e.target as Window;

    const width = target.innerHeight < MIN_HEIGHT ? target.innerWidth - 10 : target.innerWidth;
    const height = target.innerHeight < MIN_HEIGHT ? MIN_HEIGHT : target.innerHeight;

    this.setState({
      width,
      height,
    });

    this.updateDimensions(
      width,
      height,
    );
  };

  updateDimensions = (width: number, height: number) => {
    const {
      dispatch, menuBarWidth, desireCollapsed, test,
    } = this.props;

    if (width <= MIN_WIDTH) {
      dispatch(setCollapsed({
        collapsed: true,
      }));
    }

    if (width > MIN_WIDTH && desireCollapsed === false) {
      dispatch(
        setCollapsed({
          collapsed: false,
        }),
      );
    }

    dispatch(setDimensions({
      width: width - menuBarWidth,
      height,
    }));
  };

  render() {
    const { width, height } = this.state;

    return (
      <div
        className="Main"
        style={{ width, height }}
      >

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
            </Route>
            <Route path="/Contact">
              <p>Portfolio</p>
            </Route>
            <Route path="">
              <Redirect to="/Introduction" />
            </Route>
          </Switch>
        </div>

        <video className="Video" autoPlay muted loop id="backgroundVideo">
          <source src={Background} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default connector(Main);
