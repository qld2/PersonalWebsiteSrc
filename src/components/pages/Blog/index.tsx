import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

import 'antd/dist/antd.variable.css';
import './Blog.css';

import { AppState, AppDispatch } from 'src/Root';

import PdfViewer from 'components/displays/PdfViewer';
import Resume from './Resume.pdf';

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
};

class Blog extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      counter: 0,
    };
  }

  render(): React.ReactNode {
    const { width, height } = this.props;

    return (
      <div
        className="Blog"
        style={{ width, height }}
      >
        <div className="BlogViewer">
          <PdfViewer file={Resume} />
        </div>
        <div className="BlogLibrary">
          <div />
        </div>
      </div>
    );
  }
}

export default connector(Blog);
